/**
 * Tests for checkbox.tsx
 *
 * Coverage:
 * - Renders checkbox element
 * - Has data-slot="checkbox"
 * - Passes className through
 * - Renders checked/unchecked state
 * - onCheckedChange is called on interaction
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

// Mock Radix UI Checkbox primitive
vi.mock("radix-ui", () => ({
  Checkbox: {
    Root: ({
      children,
      className,
      checked,
      onCheckedChange,
      disabled,
      ...props
    }: {
      children?: React.ReactNode;
      className?: string;
      checked?: boolean;
      onCheckedChange?: (checked: boolean) => void;
      disabled?: boolean;
      [key: string]: unknown;
    }) => (
      <button
        role="checkbox"
        aria-checked={checked}
        className={className}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange?.(!checked)}
        data-testid="checkbox-root"
        {...props}
      >
        {children}
      </button>
    ),
    Indicator: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => (
      <span data-testid="checkbox-indicator" className={className}>
        {children}
      </span>
    ),
  },
}));

vi.mock("lucide-react", () => ({
  CheckIcon: () => <svg data-testid="check-icon" />,
}));

import { Checkbox } from "./checkbox";

describe("Checkbox", () => {
  it("renders the checkbox root element", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("has data-slot='checkbox'", () => {
    render(<Checkbox />);
    expect(screen.getByTestId("checkbox-root")).toHaveAttribute(
      "data-slot",
      "checkbox"
    );
  });

  it("is unchecked by default (aria-checked=false)", () => {
    render(<Checkbox checked={false} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "false");
  });

  it("reflects checked=true via aria-checked", () => {
    render(<Checkbox checked={true} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  });

  it("calls onCheckedChange when clicked", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox checked={false} onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("calls onCheckedChange with false when unchecking", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox checked={true} onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("does not call onCheckedChange when disabled", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox disabled onCheckedChange={onCheckedChange} />);
    await userEvent.click(screen.getByRole("checkbox"));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Checkbox className="custom-checkbox" />);
    expect(screen.getByTestId("checkbox-root").className).toContain(
      "custom-checkbox"
    );
  });

  it("renders the check indicator", () => {
    render(<Checkbox />);
    expect(screen.getByTestId("checkbox-indicator")).toBeInTheDocument();
  });

  it("renders the CheckIcon inside the indicator", () => {
    render(<Checkbox />);
    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });
});