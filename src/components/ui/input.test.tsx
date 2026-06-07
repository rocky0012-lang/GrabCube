/**
 * Tests for input.tsx
 *
 * Coverage:
 * - Renders as an <input> element
 * - Passes type prop through
 * - Passes className through (merged with base classes)
 * - Passes other HTML input props through (placeholder, disabled, value, etc.)
 * - Has data-slot="input"
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

import { Input } from "./input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("has data-slot='input'", () => {
    render(<Input data-testid="inp" />);
    expect(screen.getByTestId("inp")).toHaveAttribute("data-slot", "input");
  });

  it("passes the type prop", () => {
    render(<Input type="email" data-testid="inp" />);
    expect(screen.getByTestId("inp")).toHaveAttribute("type", "email");
  });

  it("defaults to no explicit type (browsers default to text)", () => {
    render(<Input data-testid="inp" />);
    // When no type is set, the attribute may not be present or be "text"
    const input = screen.getByTestId("inp");
    const type = input.getAttribute("type");
    expect(type === null || type === "text").toBe(true);
  });

  it("passes placeholder prop", () => {
    render(<Input placeholder="Enter your name" />);
    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
  });

  it("passes disabled prop", () => {
    render(<Input disabled data-testid="inp" />);
    expect(screen.getByTestId("inp")).toBeDisabled();
  });

  it("merges custom className with base classes", () => {
    render(<Input className="custom-class" data-testid="inp" />);
    expect(screen.getByTestId("inp").className).toContain("custom-class");
  });

  it("passes value and onChange for controlled usage", async () => {
    const onChange = vi.fn();
    render(<Input value="hello" onChange={onChange} />);
    expect(screen.getByRole("textbox")).toHaveValue("hello");
  });

  it("accepts password type input", () => {
    render(<Input type="password" data-testid="pwd" />);
    expect(screen.getByTestId("pwd")).toHaveAttribute("type", "password");
  });

  it("renders with a name attribute", () => {
    render(<Input name="username" data-testid="inp" />);
    expect(screen.getByTestId("inp")).toHaveAttribute("name", "username");
  });

  it("is not disabled by default", () => {
    render(<Input data-testid="inp" />);
    expect(screen.getByTestId("inp")).not.toBeDisabled();
  });
});