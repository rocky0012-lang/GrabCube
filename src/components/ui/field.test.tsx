/**
 * Tests for field.tsx
 *
 * Coverage:
 * - FieldError: renders children, renders error from errors array, deduplicates errors,
 *   renders list when multiple unique errors, returns null when no content
 * - Field: renders with default/custom orientation
 * - FieldContent, FieldLabel, FieldDescription, FieldSet, FieldGroup rendering
 */

import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock Separator dependency to avoid radix-ui complexity
import { vi } from "vitest";
vi.mock("@/components/ui/separator", () => ({
  Separator: ({ className }: { className?: string }) => (
    <hr data-testid="separator" className={className} />
  ),
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, className, ...props }: React.ComponentProps<"label">) => (
    <label className={className} {...props}>{children}</label>
  ),
}));

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./field";

// ---------------------------------------------------------------------------
// FieldError
// ---------------------------------------------------------------------------
describe("FieldError", () => {
  it("renders children when provided", () => {
    render(<FieldError>This field is required</FieldError>);
    expect(screen.getByRole("alert")).toHaveTextContent("This field is required");
  });

  it("returns null when no children and no errors", () => {
    const { container } = render(<FieldError />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when errors array is empty", () => {
    const { container } = render(<FieldError errors={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("returns null when errors array has only undefined entries", () => {
    const { container } = render(<FieldError errors={[undefined]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders a single error message from errors array", () => {
    render(<FieldError errors={[{ message: "Email is invalid" }]} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Email is invalid");
  });

  it("renders a list when multiple unique errors are provided", () => {
    render(
      <FieldError
        errors={[
          { message: "Error one" },
          { message: "Error two" },
        ]}
      />
    );
    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(2);
    expect(listItems[0]).toHaveTextContent("Error one");
    expect(listItems[1]).toHaveTextContent("Error two");
  });

  it("deduplicates errors with the same message", () => {
    render(
      <FieldError
        errors={[
          { message: "Duplicate error" },
          { message: "Duplicate error" },
        ]}
      />
    );
    // Should show only one instance, no list
    expect(screen.getByRole("alert")).toHaveTextContent("Duplicate error");
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("deduplicates and renders remaining unique errors as list", () => {
    render(
      <FieldError
        errors={[
          { message: "Error A" },
          { message: "Error B" },
          { message: "Error A" }, // duplicate
        ]}
      />
    );
    const listItems = screen.getAllByRole("listitem");
    // After dedup: Error A and Error B → 2 unique items
    expect(listItems).toHaveLength(2);
  });

  it("prefers children over errors prop", () => {
    render(
      <FieldError errors={[{ message: "From errors prop" }]}>
        From children
      </FieldError>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("From children");
    expect(screen.queryByText("From errors prop")).toBeNull();
  });

  it("applies custom className", () => {
    render(<FieldError className="custom-class">Error</FieldError>);
    expect(screen.getByRole("alert")).toHaveClass("custom-class");
  });

  it("has data-slot='field-error' attribute", () => {
    render(<FieldError>Error</FieldError>);
    expect(screen.getByRole("alert")).toHaveAttribute("data-slot", "field-error");
  });

  it("returns null when errors array entries have undefined messages", () => {
    render(<FieldError errors={[{ message: undefined }]} />);
    // The dedup map key is undefined, but value is { message: undefined }
    // The content check filters out falsy messages; the list items only render when error.message is truthy
    // With a single unique entry whose message is falsy → renders inline (returns uniqueErrors[0]?.message which is undefined)
    // undefined is falsy so the ternary returns undefined, which React renders as nothing
    // but the outer if(!content) returns null, so component renders null
    const { container } = render(<FieldError errors={[{ message: undefined }]} />);
    expect(container.firstChild).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Field
// ---------------------------------------------------------------------------
describe("Field", () => {
  it("renders with role=group", () => {
    render(<Field>Content</Field>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("has data-slot='field'", () => {
    render(<Field>Content</Field>);
    expect(screen.getByRole("group")).toHaveAttribute("data-slot", "field");
  });

  it("defaults to vertical orientation", () => {
    render(<Field>Content</Field>);
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-orientation",
      "vertical"
    );
  });

  it("renders with horizontal orientation", () => {
    render(<Field orientation="horizontal">Content</Field>);
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-orientation",
      "horizontal"
    );
  });

  it("applies custom className", () => {
    render(<Field className="my-field">Content</Field>);
    expect(screen.getByRole("group")).toHaveClass("my-field");
  });
});

// ---------------------------------------------------------------------------
// FieldContent
// ---------------------------------------------------------------------------
describe("FieldContent", () => {
  it("renders children", () => {
    render(<FieldContent>Child</FieldContent>);
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("has data-slot='field-content'", () => {
    render(<FieldContent data-testid="fc">Content</FieldContent>);
    expect(screen.getByTestId("fc")).toHaveAttribute("data-slot", "field-content");
  });

  it("applies custom className", () => {
    render(<FieldContent className="fc-class" data-testid="fc">Content</FieldContent>);
    expect(screen.getByTestId("fc")).toHaveClass("fc-class");
  });
});

// ---------------------------------------------------------------------------
// FieldDescription
// ---------------------------------------------------------------------------
describe("FieldDescription", () => {
  it("renders text content", () => {
    render(<FieldDescription>Helper text here</FieldDescription>);
    expect(screen.getByText("Helper text here")).toBeInTheDocument();
  });

  it("has data-slot='field-description'", () => {
    const { container } = render(
      <FieldDescription>Description</FieldDescription>
    );
    const el = container.querySelector("[data-slot='field-description']");
    expect(el).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// FieldLabel
// ---------------------------------------------------------------------------
describe("FieldLabel", () => {
  it("renders label text", () => {
    render(<FieldLabel>My Label</FieldLabel>);
    expect(screen.getByText("My Label")).toBeInTheDocument();
  });

  it("has data-slot='field-label'", () => {
    render(<FieldLabel data-testid="lbl">My Label</FieldLabel>);
    expect(screen.getByTestId("lbl")).toHaveAttribute("data-slot", "field-label");
  });
});

// ---------------------------------------------------------------------------
// FieldSet
// ---------------------------------------------------------------------------
describe("FieldSet", () => {
  it("renders as a fieldset element", () => {
    render(<FieldSet><legend>Group</legend></FieldSet>);
    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("has data-slot='field-set'", () => {
    const { container } = render(<FieldSet />);
    expect(container.querySelector("[data-slot='field-set']")).not.toBeNull();
  });
});

// ---------------------------------------------------------------------------
// FieldLegend
// ---------------------------------------------------------------------------
describe("FieldLegend", () => {
  it("renders children", () => {
    render(
      <fieldset>
        <FieldLegend>My Legend</FieldLegend>
      </fieldset>
    );
    expect(screen.getByText("My Legend")).toBeInTheDocument();
  });

  it("defaults to legend variant", () => {
    render(
      <fieldset>
        <FieldLegend data-testid="leg">Legend</FieldLegend>
      </fieldset>
    );
    expect(screen.getByTestId("leg")).toHaveAttribute("data-variant", "legend");
  });

  it("accepts label variant", () => {
    render(
      <fieldset>
        <FieldLegend variant="label" data-testid="leg">Label-style legend</FieldLegend>
      </fieldset>
    );
    expect(screen.getByTestId("leg")).toHaveAttribute("data-variant", "label");
  });
});

// ---------------------------------------------------------------------------
// FieldGroup
// ---------------------------------------------------------------------------
describe("FieldGroup", () => {
  it("renders children", () => {
    render(<FieldGroup>Group content</FieldGroup>);
    expect(screen.getByText("Group content")).toBeInTheDocument();
  });

  it("has data-slot='field-group'", () => {
    render(<FieldGroup data-testid="fg">Group</FieldGroup>);
    expect(screen.getByTestId("fg")).toHaveAttribute("data-slot", "field-group");
  });
});

// ---------------------------------------------------------------------------
// FieldTitle
// ---------------------------------------------------------------------------
describe("FieldTitle", () => {
  it("renders title text", () => {
    render(<FieldTitle>Section Title</FieldTitle>);
    expect(screen.getByText("Section Title")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// FieldSeparator
// ---------------------------------------------------------------------------
describe("FieldSeparator", () => {
  it("renders without children", () => {
    render(<FieldSeparator />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(<FieldSeparator>OR</FieldSeparator>);
    expect(screen.getByText("OR")).toBeInTheDocument();
  });
});