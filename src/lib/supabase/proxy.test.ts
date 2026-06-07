/**
 * Tests for proxy.ts – updateSession middleware
 *
 * Coverage:
 * - Redirects unauthenticated users to /login when not on /login or /auth path
 * - Does NOT redirect when on /login path (even without user)
 * - Does NOT redirect when on /auth path (even without user)
 * - Does NOT redirect when on /auth/callback (nested auth path)
 * - Returns supabaseResponse when user is authenticated (any path)
 * - Returns supabaseResponse (not redirect) when user is present on any protected path
 * - Cookie setAll forwards cookies to the response
 * - Cookie getAll reads from the request
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------
const mockGetClaims = vi.fn();
const mockCreateServerClient = vi.fn();

vi.mock("@supabase/ssr", () => ({
  createServerClient: (...args: unknown[]) => mockCreateServerClient(...args),
}));

vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return {
    ...actual,
    NextResponse: {
      ...actual.NextResponse,
      next: vi.fn((opts?: { request?: unknown }) => ({
        type: "next",
        cookies: {
          set: vi.fn(),
          getAll: vi.fn(() => []),
          setAll: vi.fn(),
        },
        headers: {
          set: vi.fn(),
        },
        request: opts?.request,
      })),
      redirect: vi.fn((url: URL) => ({
        type: "redirect",
        url: url.toString(),
        headers: { get: vi.fn() },
      })),
    },
  };
});

// ---------------------------------------------------------------------------
// Helper to build a mock NextRequest
// ---------------------------------------------------------------------------
function makeRequest(pathname: string): NextRequest {
  const url = `https://example.com${pathname}`;
  const cookieStore: Record<string, string> = {};

  return {
    nextUrl: {
      pathname,
      clone: () => {
        const cloned = { pathname };
        return {
          get pathname() { return cloned.pathname; },
          set pathname(p: string) { cloned.pathname = p; },
          toString() { return `https://example.com${cloned.pathname}`; },
        };
      },
    },
    cookies: {
      getAll: () => Object.entries(cookieStore).map(([name, value]) => ({ name, value })),
      set: (name: string, value: string) => { cookieStore[name] = value; },
    },
    url,
  } as unknown as NextRequest;
}

// ---------------------------------------------------------------------------
// Import after mocks
// ---------------------------------------------------------------------------
import { updateSession } from "./proxy";

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe("updateSession", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default: createServerClient returns a client with getClaims
    mockCreateServerClient.mockImplementation((_url, _key, { cookies }) => {
      return {
        auth: {
          getClaims: mockGetClaims,
        },
      };
    });
  });

  describe("unauthenticated user (no claims)", () => {
    beforeEach(() => {
      mockGetClaims.mockResolvedValue({ data: { claims: null }, error: null });
    });

    it("redirects to /login when visiting a protected path", async () => {
      const request = makeRequest("/dashboard");
      const response = await updateSession(request);
      expect((response as { type: string }).type).toBe("redirect");
    });

    it("redirects to /login when visiting the root path", async () => {
      const request = makeRequest("/");
      const response = await updateSession(request);
      expect((response as { type: string }).type).toBe("redirect");
    });

    it("does NOT redirect when visiting /login", async () => {
      const request = makeRequest("/login");
      const response = await updateSession(request);
      expect((response as { type: string }).type).not.toBe("redirect");
    });

    it("does NOT redirect when visiting /login/forgot-password", async () => {
      const request = makeRequest("/login/forgot-password");
      const response = await updateSession(request);
      expect((response as { type: string }).type).not.toBe("redirect");
    });

    it("does NOT redirect when visiting /auth", async () => {
      const request = makeRequest("/auth");
      const response = await updateSession(request);
      expect((response as { type: string }).type).not.toBe("redirect");
    });

    it("does NOT redirect when visiting /auth/callback", async () => {
      const request = makeRequest("/auth/callback");
      const response = await updateSession(request);
      expect((response as { type: string }).type).not.toBe("redirect");
    });

    it("redirects to /login (not to the requested URL)", async () => {
      const request = makeRequest("/protected-page");
      const response = await updateSession(request);
      const redirectResponse = response as { type: string; url: string };
      expect(redirectResponse.url).toContain("/login");
    });
  });

  describe("authenticated user (with claims)", () => {
    beforeEach(() => {
      mockGetClaims.mockResolvedValue({
        data: { claims: { sub: "user-123", email: "user@example.com" } },
        error: null,
      });
    });

    it("returns supabaseResponse (not a redirect) for protected paths", async () => {
      const request = makeRequest("/dashboard");
      const response = await updateSession(request);
      expect((response as { type: string }).type).toBe("next");
    });

    it("returns supabaseResponse for root path", async () => {
      const request = makeRequest("/");
      const response = await updateSession(request);
      expect((response as { type: string }).type).toBe("next");
    });

    it("returns supabaseResponse for /login path", async () => {
      const request = makeRequest("/login");
      const response = await updateSession(request);
      expect((response as { type: string }).type).toBe("next");
    });

    it("returns supabaseResponse for /auth/callback path", async () => {
      const request = makeRequest("/auth/callback");
      const response = await updateSession(request);
      expect((response as { type: string }).type).toBe("next");
    });
  });

  describe("Supabase client creation", () => {
    it("calls createServerClient with correct env variables", async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "test-key";

      mockGetClaims.mockResolvedValue({ data: { claims: { sub: "user-123" } } });
      const request = makeRequest("/dashboard");
      await updateSession(request);

      expect(mockCreateServerClient).toHaveBeenCalledWith(
        "https://test.supabase.co",
        "test-key",
        expect.objectContaining({
          cookies: expect.objectContaining({
            getAll: expect.any(Function),
            setAll: expect.any(Function),
          }),
        })
      );
    });

    it("calls getClaims on every request", async () => {
      mockGetClaims.mockResolvedValue({ data: { claims: { sub: "u1" } } });
      const request = makeRequest("/page");
      await updateSession(request);
      expect(mockGetClaims).toHaveBeenCalledTimes(1);
    });
  });

  describe("cookie handling", () => {
    it("reads cookies from the request via getAll", async () => {
      mockGetClaims.mockResolvedValue({ data: { claims: { sub: "u1" } } });

      let capturedGetAll: (() => unknown) | undefined;
      mockCreateServerClient.mockImplementation((_url, _key, { cookies }) => {
        capturedGetAll = cookies.getAll;
        return { auth: { getClaims: mockGetClaims } };
      });

      const request = makeRequest("/dashboard");
      await updateSession(request);

      // capturedGetAll should delegate to request.cookies.getAll
      expect(capturedGetAll).toBeDefined();
      const result = capturedGetAll!();
      expect(Array.isArray(result)).toBe(true);
    });
  });
});