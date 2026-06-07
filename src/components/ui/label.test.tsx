/**
 * Tests for label.tsx
 *
 * Coverage:
 * - Renders label text
 * - Has data-slot="label"
 * - Passes className through
 * - Associates with a form element via htmlFor
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

// Mock radix-ui Label primitive (it renders a <label>)
vi.mock("radix-ui", () => ({
  Label: {
    Root: ({
      children,
      className,
      htmlFor,
      ...props
    }: React.ComponentProps<"label">) => (
      <label className={className} htmlFor={htmlFor} {...props}>
        {children}
      </label>
    ),
  },
}));

import { Label } from "./label";

describe("Label", () => {
  it("renders label text", () => {
    render(<Label>Email Address</Label>);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("has data-slot='label'", () => {
    render(<Label data-testid="lbl">Label</Label>);
    expect(screen.getByTestId("lbl")).toHaveAttribute("data-slot", "label");
  });

  it("applies custom className", () => {
    render(<Label className="my-label" data-testid="lbl">Label</Label>);
    expect(screen.getByTestId("lbl").className).toContain("my-label");
  });

  it("associates with a form input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email-input">Email</Label>
        <input id="email-input" type="email" />
      </>
    );
    const label = screen.getByText("Email");
    expect(label).toHaveAttribute("for", "email-input");
  });

  it("renders as a label element", () => {
    render(<Label>Click me</Label>);
    const el = screen.getByText("Click me");
    expect(el.tagName.toLowerCase()).toBe("label");
  });

  it("renders children correctly", () => {
    render(
      <Label>
        <span data-testid="inner">Inner child</span>
      </Label>
    );
    expect(screen.getByTestId("inner")).toBeInTheDocument();
  });
});