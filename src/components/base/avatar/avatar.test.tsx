/**
 * Tests for avatar.tsx
 *
 * Coverage:
 * - useEffect resets isFailed to false when `src` prop changes
 * - Shows image when src is valid
 * - Falls back to placeholder when image fails
 * - Falls back to initials when no src
 * - Falls back to placeholder icon when provided
 */

import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

// Mock all icon/component dependencies
vi.mock("@untitledui/icons", () => ({
  User01: ({ className }: { className?: string }) => (
    <svg data-testid="user01-icon" className={className} />
  ),
}));

vi.mock("@/lib/utils/cx", () => ({
  cx: (...args: string[]) => args.filter(Boolean).join(" "),
}));

vi.mock("./base-components", () => ({
  AvatarOnlineIndicator: ({ status }: { status: string }) => (
    <div data-testid={`online-indicator-${status}`} />
  ),
  VerifiedTick: ({ size }: { size: string }) => (
    <div data-testid="verified-tick" />
  ),
}));

vi.mock("./base-components/avatar-count", () => ({
  AvatarCount: ({ count }: { count: number }) => (
    <div data-testid="avatar-count">{count}</div>
  ),
}));

import { Avatar } from "./avatar";

describe("Avatar", () => {
  describe("image display", () => {
    it("renders an img tag when src is provided", () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
      const img = screen.getByRole("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
    });

    it("renders the User01 fallback icon when no src is provided", () => {
      render(<Avatar />);
      expect(screen.getByTestId("user01-icon")).toBeInTheDocument();
    });

    it("renders initials when no src and initials prop provided", () => {
      render(<Avatar initials="JD" />);
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("renders custom placeholder icon when provided", () => {
      const PlaceholderIcon = ({ className }: { className?: string }) => (
        <svg data-testid="custom-icon" className={className} />
      );
      render(<Avatar placeholderIcon={PlaceholderIcon} />);
      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("renders custom placeholder node when provided", () => {
      render(<Avatar placeholder={<span data-testid="custom-placeholder">PH</span>} />);
      expect(screen.getByTestId("custom-placeholder")).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("hides image and shows fallback when image fails to load", () => {
      render(<Avatar src="https://example.com/broken.jpg" alt="User" initials="JD" />);
      const img = screen.getByRole("img");

      // Simulate image load error
      fireEvent.error(img);

      // After error, image should be hidden and initials shown
      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("shows User01 icon as fallback when image fails and no initials", () => {
      render(<Avatar src="https://example.com/broken.jpg" alt="User" />);
      const img = screen.getByRole("img");
      fireEvent.error(img);
      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByTestId("user01-icon")).toBeInTheDocument();
    });
  });

  describe("useEffect: resets isFailed when src changes", () => {
    it("resets to show image when src changes after previous image failed", () => {
      const { rerender } = render(
        <Avatar src="https://example.com/broken.jpg" alt="User" initials="JD" />
      );
      const img = screen.getByRole("img");
      fireEvent.error(img);

      // Image should have failed → shows initials
      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByText("JD")).toBeInTheDocument();

      // Change src → useEffect should reset isFailed to false
      rerender(
        <Avatar src="https://example.com/working.jpg" alt="User" initials="JD" />
      );

      // Image should be visible again with new src
      const newImg = screen.getByRole("img");
      expect(newImg).toBeInTheDocument();
      expect(newImg).toHaveAttribute("src", "https://example.com/working.jpg");
    });

    it("does not reset isFailed when src stays the same", () => {
      const { rerender } = render(
        <Avatar src="https://example.com/broken.jpg" alt="User" initials="JD" />
      );
      const img = screen.getByRole("img");
      fireEvent.error(img);

      // Re-render with same src
      rerender(
        <Avatar src="https://example.com/broken.jpg" alt="User" initials="JD" />
      );

      // isFailed should still be true → initials shown
      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });

    it("resets isFailed when src changes from a value to null", () => {
      const { rerender } = render(
        <Avatar src="https://example.com/broken.jpg" alt="User" initials="JD" />
      );
      const img = screen.getByRole("img");
      fireEvent.error(img);

      // Change src to null → useEffect fires, resets isFailed
      rerender(<Avatar src={null} alt="User" initials="JD" />);

      // src is null so no image is rendered, but isFailed is false (reset)
      // The avatar shows initials since canShowImage = (null && !false) = false
      expect(screen.queryByRole("img")).toBeNull();
      expect(screen.getByText("JD")).toBeInTheDocument();
    });
  });

  describe("badge/status rendering", () => {
    it("renders the online indicator when status=online", () => {
      render(<Avatar status="online" />);
      expect(screen.getByTestId("online-indicator-online")).toBeInTheDocument();
    });

    it("renders the offline indicator when status=offline", () => {
      render(<Avatar status="offline" />);
      expect(screen.getByTestId("online-indicator-offline")).toBeInTheDocument();
    });

    it("renders verified tick when verified=true", () => {
      render(<Avatar verified />);
      expect(screen.getByTestId("verified-tick")).toBeInTheDocument();
    });

    it("renders avatar count when count is provided", () => {
      render(<Avatar count={5} />);
      expect(screen.getByTestId("avatar-count")).toHaveTextContent("5");
    });

    it("renders custom badge when badge prop is provided", () => {
      render(<Avatar badge={<div data-testid="custom-badge" />} />);
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });
  });

  describe("size prop", () => {
    it("renders without error for all size variants", () => {
      const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;
      sizes.forEach((size) => {
        const { unmount } = render(<Avatar size={size} />);
        unmount();
      });
    });
  });
});