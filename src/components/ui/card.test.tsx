/**
 * Tests for card.tsx
 *
 * Coverage:
 * - Card renders with correct data-slot and data-size attributes
 * - CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter render
 * - Custom className is applied
 * - Card size="sm" applies data-size="sm"
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "./card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card data-testid="card">Card Content</Card>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("has data-slot='card'", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveAttribute("data-slot", "card");
  });

  it("defaults to size='default'", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveAttribute("data-size", "default");
  });

  it("sets data-size='sm' when size='sm'", () => {
    render(<Card size="sm" data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveAttribute("data-size", "sm");
  });

  it("applies custom className", () => {
    render(<Card className="my-custom-class" data-testid="card">Content</Card>);
    expect(screen.getByTestId("card").className).toContain("my-custom-class");
  });
});

describe("CardHeader", () => {
  it("renders children", () => {
    render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("has data-slot='card-header'", () => {
    render(<CardHeader data-testid="ch">Header</CardHeader>);
    expect(screen.getByTestId("ch")).toHaveAttribute("data-slot", "card-header");
  });

  it("applies custom className", () => {
    render(<CardHeader className="hdr-class" data-testid="ch">Header</CardHeader>);
    expect(screen.getByTestId("ch").className).toContain("hdr-class");
  });
});

describe("CardTitle", () => {
  it("renders children", () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("has data-slot='card-title'", () => {
    render(<CardTitle data-testid="ct">Title</CardTitle>);
    expect(screen.getByTestId("ct")).toHaveAttribute("data-slot", "card-title");
  });
});

describe("CardDescription", () => {
  it("renders children", () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("has data-slot='card-description'", () => {
    render(<CardDescription data-testid="cd">Desc</CardDescription>);
    expect(screen.getByTestId("cd")).toHaveAttribute(
      "data-slot",
      "card-description"
    );
  });
});

describe("CardAction", () => {
  it("renders children", () => {
    render(<CardAction>Action</CardAction>);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  it("has data-slot='card-action'", () => {
    render(<CardAction data-testid="ca">Action</CardAction>);
    expect(screen.getByTestId("ca")).toHaveAttribute("data-slot", "card-action");
  });
});

describe("CardContent", () => {
  it("renders children", () => {
    render(<CardContent>Content area</CardContent>);
    expect(screen.getByText("Content area")).toBeInTheDocument();
  });

  it("has data-slot='card-content'", () => {
    render(<CardContent data-testid="cc">Content</CardContent>);
    expect(screen.getByTestId("cc")).toHaveAttribute("data-slot", "card-content");
  });
});

describe("CardFooter", () => {
  it("renders children", () => {
    render(<CardFooter>Footer text</CardFooter>);
    expect(screen.getByText("Footer text")).toBeInTheDocument();
  });

  it("has data-slot='card-footer'", () => {
    render(<CardFooter data-testid="cf">Footer</CardFooter>);
    expect(screen.getByTestId("cf")).toHaveAttribute("data-slot", "card-footer");
  });
});

describe("Card composition", () => {
  it("renders a complete card with all sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>Test description</CardDescription>
        </CardHeader>
        <CardContent>Main content here</CardContent>
        <CardFooter>Footer content</CardFooter>
      </Card>
    );
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByText("Main content here")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });
});