/**
 * Tests for avatar-company-icon.tsx
 *
 * Coverage:
 * - Renders img with correct src/alt/className
 * - Returns null (renders nothing) when image errors
 * - Applies correct size class from the sizes map
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

vi.mock("@/lib/utils/cx", () => ({
  cx: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

import { AvatarCompanyIcon } from "./avatar-company-icon";

describe("AvatarCompanyIcon", () => {
  describe("rendering", () => {
    it("renders an img element with the provided src", () => {
      render(<AvatarCompanyIcon size="md" src="https://example.com/logo.png" />);
      const img = screen.getByRole("img");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/logo.png");
    });

    it("renders with the provided alt text", () => {
      render(
        <AvatarCompanyIcon
          size="md"
          src="https://example.com/logo.png"
          alt="Company Logo"
        />
      );
      expect(screen.getByAltText("Company Logo")).toBeInTheDocument();
    });

    it("renders without an alt when alt prop is not provided", () => {
      render(<AvatarCompanyIcon size="md" src="https://example.com/logo.png" />);
      const img = screen.getByRole("img");
      expect(img).not.toHaveAttribute("alt");
    });
  });

  describe("error handling", () => {
    it("hides the image (returns null) when the image fails to load", () => {
      render(
        <AvatarCompanyIcon size="md" src="https://example.com/broken.png" />
      );
      const img = screen.getByRole("img");

      // Trigger error
      fireEvent.error(img);

      // Component should now render nothing
      expect(screen.queryByRole("img")).toBeNull();
    });

    it("only hides the image after an error, not before", () => {
      render(
        <AvatarCompanyIcon size="md" src="https://example.com/logo.png" />
      );
      // Before error, image is visible
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("size classes", () => {
    const sizeMap: Record<string, string> = {
      xs: "size-2",
      sm: "size-3",
      md: "size-3.5",
      lg: "size-4",
      xl: "size-4.5",
      "2xl": "size-5",
    };

    Object.entries(sizeMap).forEach(([size, expectedClass]) => {
      it(`applies the correct class for size="${size}"`, () => {
        render(
          <AvatarCompanyIcon
            size={size as "xs" | "sm" | "md" | "lg" | "xl" | "2xl"}
            src="https://example.com/logo.png"
          />
        );
        const img = screen.getByRole("img");
        expect(img.className).toContain(expectedClass);
      });
    });
  });

  describe("base class applied", () => {
    it("always includes base positioning and styling classes", () => {
      render(<AvatarCompanyIcon size="sm" src="https://example.com/logo.png" />);
      const img = screen.getByRole("img");
      expect(img.className).toContain("absolute");
      expect(img.className).toContain("rounded-full");
      expect(img.className).toContain("object-cover");
    });
  });
});