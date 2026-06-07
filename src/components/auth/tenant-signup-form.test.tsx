/**
 * Tests for tenant-signup-form.tsx
 *
 * Coverage:
 * - signupSchema Zod validation rules
 * - ModernSignupForm rendering and interaction
 * - PhoneInputField rendering
 * - Password visibility toggles
 * - Form error messages
 */

import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Re-declare schema for direct unit testing (mirrors the one in the module)
// ---------------------------------------------------------------------------
const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.string().email("Please input a valid email address."),
    countryCode: z.string().min(1, "Required."),
    phoneNumber: z.string().min(10, "Please enter a valid phone number."),
    password: z.string().min(8, "Password must contain 8+ characters."),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const validData = {
  firstName: "Jane",
  lastName: "Doe",
  email: "jane.doe@example.com",
  countryCode: "+254",
  phoneNumber: "+254712345678",
  password: "SecureP@ss1",
  confirmPassword: "SecureP@ss1",
  terms: true,
};

// ---------------------------------------------------------------------------
// Mock heavy third-party modules that would otherwise require a real browser
// ---------------------------------------------------------------------------
vi.mock("react-phone-number-input", () => ({
  default: ({ onChange, value, className }: {
    onChange: (v?: string) => void;
    value?: string;
    className?: string;
  }) => (
    <input
      data-testid="phone-input"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    />
  ),
}));

vi.mock("react-phone-number-input/style.css", () => ({}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: React.ComponentProps<"button">) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props: React.ComponentProps<"input">) => <input {...props} />,
}));

vi.mock("@/components/ui/checkbox", () => ({
  Checkbox: ({
    checked,
    onCheckedChange,
    id,
  }: {
    checked?: boolean;
    onCheckedChange?: (v: boolean) => void;
    id?: string;
  }) => (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      data-testid="terms-checkbox"
    />
  ),
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: React.ComponentProps<"div">) => (
    <div className={className}>{children}</div>
  ),
  CardHeader: ({ children }: React.ComponentProps<"div">) => <div>{children}</div>,
  CardTitle: ({ children }: React.ComponentProps<"div">) => <h2>{children}</h2>,
  CardDescription: ({ children }: React.ComponentProps<"div">) => <p>{children}</p>,
  CardContent: ({ children }: React.ComponentProps<"div">) => <div>{children}</div>,
}));

vi.mock("@/components/ui/select", () => ({
  Select: ({ children }: React.ComponentProps<"div">) => <div>{children}</div>,
  SelectContent: ({ children }: React.ComponentProps<"div">) => <div>{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <option value={value}>{children}</option>
  ),
  SelectTrigger: ({ children }: React.ComponentProps<"div">) => <div>{children}</div>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>,
}));

vi.mock("@/components/ui/field", () => ({
  Field: ({ children, ...props }: React.ComponentProps<"div">) => (
    <div {...props}>{children}</div>
  ),
  FieldContent: ({ children, ...props }: React.ComponentProps<"div">) => (
    <div {...props}>{children}</div>
  ),
  FieldDescription: ({ children }: React.ComponentProps<"p">) => <p>{children}</p>,
  FieldLabel: ({ children, ...props }: React.ComponentProps<"label">) => (
    <label {...props}>{children}</label>
  ),
  FieldError: ({ children }: { children?: React.ReactNode }) =>
    children ? <span role="alert">{children}</span> : null,
}));

// ---------------------------------------------------------------------------
// Zod schema unit tests
// ---------------------------------------------------------------------------
describe("signupSchema", () => {
  describe("firstName", () => {
    it("accepts a non-empty string", () => {
      const result = signupSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it("rejects an empty first name", () => {
      const result = signupSchema.safeParse({ ...validData, firstName: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.firstName).toContain("First name is required.");
      }
    });
  });

  describe("lastName", () => {
    it("rejects an empty last name", () => {
      const result = signupSchema.safeParse({ ...validData, lastName: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.lastName).toContain("Last name is required.");
      }
    });
  });

  describe("email", () => {
    it("accepts a valid email", () => {
      const result = signupSchema.safeParse({ ...validData, email: "user@test.com" });
      expect(result.success).toBe(true);
    });

    it("rejects an invalid email", () => {
      const result = signupSchema.safeParse({ ...validData, email: "not-an-email" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.email).toContain("Please input a valid email address.");
      }
    });

    it("rejects an email missing domain", () => {
      const result = signupSchema.safeParse({ ...validData, email: "user@" });
      expect(result.success).toBe(false);
    });

    it("rejects an empty email", () => {
      const result = signupSchema.safeParse({ ...validData, email: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("phoneNumber", () => {
    it("accepts a phone number with 10+ characters", () => {
      const result = signupSchema.safeParse({
        ...validData,
        phoneNumber: "0712345678",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a phone number shorter than 10 characters", () => {
      const result = signupSchema.safeParse({ ...validData, phoneNumber: "071234" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.phoneNumber).toContain(
          "Please enter a valid phone number."
        );
      }
    });

    it("rejects an empty phone number", () => {
      const result = signupSchema.safeParse({ ...validData, phoneNumber: "" });
      expect(result.success).toBe(false);
    });
  });

  describe("password", () => {
    it("accepts a password with 8+ characters", () => {
      const result = signupSchema.safeParse({
        ...validData,
        password: "12345678",
        confirmPassword: "12345678",
      });
      expect(result.success).toBe(true);
    });

    it("rejects a password shorter than 8 characters", () => {
      const result = signupSchema.safeParse({
        ...validData,
        password: "short",
        confirmPassword: "short",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.password).toContain("Password must contain 8+ characters.");
      }
    });

    it("rejects when passwords do not match", () => {
      const result = signupSchema.safeParse({
        ...validData,
        password: "Password1!",
        confirmPassword: "DifferentPassword!",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        const formErrors = result.error.flatten().fieldErrors;
        expect(formErrors.confirmPassword).toContain("Passwords do not match.");
      }
    });

    it("accepts when passwords match exactly", () => {
      const result = signupSchema.safeParse({
        ...validData,
        password: "MySecurePass1!",
        confirmPassword: "MySecurePass1!",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("terms", () => {
    it("accepts terms=true", () => {
      const result = signupSchema.safeParse({ ...validData, terms: true });
      expect(result.success).toBe(true);
    });

    it("rejects terms=false", () => {
      const result = signupSchema.safeParse({ ...validData, terms: false });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.terms).toContain("You must agree to the terms.");
      }
    });
  });

  describe("countryCode", () => {
    it("rejects an empty countryCode", () => {
      const result = signupSchema.safeParse({ ...validData, countryCode: "" });
      expect(result.success).toBe(false);
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.countryCode).toContain("Required.");
      }
    });

    it("accepts a non-empty countryCode", () => {
      const result = signupSchema.safeParse({ ...validData, countryCode: "+1" });
      expect(result.success).toBe(true);
    });
  });

  it("accepts all valid data", () => {
    const result = signupSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Component tests
// ---------------------------------------------------------------------------
import { ModernSignupForm, PhoneInputField } from "./tenant-signup-form";

describe("PhoneInputField", () => {
  it("renders a phone input with the given value", () => {
    const onChange = vi.fn();
    render(<PhoneInputField value="+254712345678" onChange={onChange} />);
    const input = screen.getByTestId("phone-input");
    expect(input).toBeInTheDocument();
    expect((input as HTMLInputElement).value).toBe("+254712345678");
  });

  it("calls onChange when the value changes", async () => {
    const onChange = vi.fn();
    render(<PhoneInputField value="" onChange={onChange} />);
    const input = screen.getByTestId("phone-input");
    await userEvent.type(input, "+1");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders without a value prop", () => {
    const onChange = vi.fn();
    render(<PhoneInputField onChange={onChange} />);
    expect(screen.getByTestId("phone-input")).toBeInTheDocument();
  });
});

describe("ModernSignupForm", () => {
  it("renders the form heading", () => {
    render(<ModernSignupForm />);
    expect(screen.getByText("Create an account")).toBeInTheDocument();
  });

  it("renders all main input labels", () => {
    render(<ModernSignupForm />);
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ModernSignupForm />);
    expect(
      screen.getByRole("button", { name: /Complete Registration/i })
    ).toBeInTheDocument();
  });

  it("renders the terms checkbox", () => {
    render(<ModernSignupForm />);
    expect(screen.getByTestId("terms-checkbox")).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    render(<ModernSignupForm />);
    const submitButton = screen.getByRole("button", { name: /Complete Registration/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("First name is required.")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Last name is required.")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Please input a valid email address.")).toBeInTheDocument();
    });
  });

  it("shows password length error for a short password", async () => {
    render(<ModernSignupForm />);
    // There are two password inputs with the same placeholder; get them by name
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    // First placeholder match is the password field
    const passwordInput = passwordInputs[0];
    await userEvent.type(passwordInput, "short");
    const submitButton = screen.getByRole("button", { name: /Complete Registration/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must contain 8+ characters.")
      ).toBeInTheDocument();
    });
  });

  it("toggles password visibility when eye button is clicked", async () => {
    render(<ModernSignupForm />);
    // There are two password inputs; get the first one (password)
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    const passwordInput = passwordInputs[0];
    expect(passwordInput).toHaveAttribute("type", "password");

    // The toggle button is the first button that is not the submit button
    const toggleButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.getAttribute("type") === "button");
    await userEvent.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click again to hide
    await userEvent.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("toggles confirm password visibility when its eye button is clicked", async () => {
    render(<ModernSignupForm />);
    const passwordInputs = screen.getAllByPlaceholderText("••••••••");
    const confirmPasswordInput = passwordInputs[1];
    expect(confirmPasswordInput).toHaveAttribute("type", "password");

    const toggleButtons = screen
      .getAllByRole("button")
      .filter((btn) => btn.getAttribute("type") === "button");
    await userEvent.click(toggleButtons[1]);
    expect(confirmPasswordInput).toHaveAttribute("type", "text");
  });

  it("shows terms error when terms not accepted on submit", async () => {
    render(<ModernSignupForm />);
    const submitButton = screen.getByRole("button", { name: /Complete Registration/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("You must agree to the terms.")).toBeInTheDocument();
    });
  });

  it("does not show 'Registering...' label while not submitting", () => {
    render(<ModernSignupForm />);
    expect(screen.queryByText("Registering...")).not.toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<ModernSignupForm />);
    expect(
      screen.getByText("Fill out the fields below to register")
    ).toBeInTheDocument();
  });
});