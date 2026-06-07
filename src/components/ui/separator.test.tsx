/**
 * Tests for separator.tsx
 *
 * Coverage:
 * - Renders with data-slot="separator"
 * - Default orientation is horizontal
 * - Accepts vertical orientation
 * - Default decorative=true
 * - Applies custom className
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

// Mock Radix UI Separator so tests don't depend on its internals
vi.mock("radix-ui", () => ({
  Separator: {
    Root: ({
      className,
      orientation,
      decorative,
      ...props
    }: {
      className?: string;
      orientation?: string;
      decorative?: boolean;
      [key: string]: unknown;
    }) => (
      <div
        data-testid="separator-root"
        className={className}
        data-orientation={orientation}
        aria-hidden={decorative ? "true" : undefined}
        {...props}
      />
    ),
  },
}));

import { Separator } from "./separator";

describe("Separator", () => {
  it("renders the separator", () => {
    render(<Separator />);
    expect(screen.getByTestId("separator-root")).toBeInTheDocument();
  });

  it("has data-slot='separator'", () => {
    render(<Separator />);
    expect(screen.getByTestId("separator-root")).toHaveAttribute(
      "data-slot",
      "separator"
    );
  });

  it("defaults to horizontal orientation", () => {
    render(<Separator />);
    expect(screen.getByTestId("separator-root")).toHaveAttribute(
      "data-orientation",
      "horizontal"
    );
  });

  it("accepts vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByTestId("separator-root")).toHaveAttribute(
      "data-orientation",
      "vertical"
    );
  });

  it("is decorative by default (aria-hidden=true)", () => {
    render(<Separator />);
    expect(screen.getByTestId("separator-root")).toHaveAttribute(
      "aria-hidden",
      "true"
    );
  });

  it("applies custom className", () => {
    render(<Separator className="my-separator" />);
    expect(screen.getByTestId("separator-root").className).toContain(
      "my-separator"
    );
  });

  it("includes base shrink-0 and bg-border classes", () => {
    render(<Separator />);
    const el = screen.getByTestId("separator-root");
    expect(el.className).toContain("shrink-0");
    expect(el.className).toContain("bg-border");
  });
});