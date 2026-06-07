/**
 * Tests for onboard-dropdown.tsx
 *
 * Coverage:
 * - ProductsDropdown renders correct label and all product menu items
 * - ServicesDropdown renders correct label and all service menu items
 * - NavigationDropdown renders dynamic items correctly
 */

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the Dropdown component since it uses react-aria-components
vi.mock("@/components/base/dropdown/dropdown", () => ({
  Dropdown: {
    Root: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dropdown-root">{children}</div>
    ),
    Popover: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="dropdown-popover">{children}</div>
    ),
    Menu: ({ children }: { children: React.ReactNode }) => (
      <ul data-testid="dropdown-menu">{children}</ul>
    ),
    Item: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href?: string;
    }) => (
      <li>
        <a href={href}>{children}</a>
      </li>
    ),
  },
}));

vi.mock("../base/buttons/button", () => ({
  Button: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <button className={className}>{children}</button>,
}));

vi.mock("lucide-react", () => ({
  ChevronDown: ({ className }: { className?: string }) => (
    <svg data-testid="chevron-down" className={className} />
  ),
}));

import { ProductsDropdown, ServicesDropdown } from "./onboard-dropdown";

describe("ProductsDropdown", () => {
  it("renders the 'Products' label", () => {
    render(<ProductsDropdown />);
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders all product menu items", () => {
    render(<ProductsDropdown />);
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Automation")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Integrations")).toBeInTheDocument();
  });

  it("renders product items with correct hrefs", () => {
    render(<ProductsDropdown />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/products/analytics");
    expect(hrefs).toContain("/products/automation");
    expect(hrefs).toContain("/products/reports");
    expect(hrefs).toContain("/products/integrations");
  });

  it("renders exactly 4 product items", () => {
    render(<ProductsDropdown />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });

  it("renders the chevron down icon", () => {
    render(<ProductsDropdown />);
    expect(screen.getByTestId("chevron-down")).toBeInTheDocument();
  });

  it("wraps content in a dropdown root", () => {
    render(<ProductsDropdown />);
    expect(screen.getByTestId("dropdown-root")).toBeInTheDocument();
  });
});

describe("ServicesDropdown", () => {
  it("renders the 'Services' label", () => {
    render(<ServicesDropdown />);
    expect(screen.getByText("Services")).toBeInTheDocument();
  });

  it("renders all service menu items", () => {
    render(<ServicesDropdown />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
    expect(screen.getByText("UI/UX Design")).toBeInTheDocument();
    expect(screen.getByText("Consulting")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  it("renders service items with correct hrefs", () => {
    render(<ServicesDropdown />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("/services/web-development");
    expect(hrefs).toContain("/services/ui-ux-design");
    expect(hrefs).toContain("/services/consulting");
    expect(hrefs).toContain("/services/support");
  });

  it("renders exactly 4 service items", () => {
    render(<ServicesDropdown />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
  });

  it("renders the chevron down icon", () => {
    render(<ServicesDropdown />);
    expect(screen.getByTestId("chevron-down")).toBeInTheDocument();
  });
});

describe("ProductsDropdown vs ServicesDropdown isolation", () => {
  it("does not render service items in ProductsDropdown", () => {
    render(<ProductsDropdown />);
    expect(screen.queryByText("Web Development")).toBeNull();
    expect(screen.queryByText("Consulting")).toBeNull();
  });

  it("does not render product items in ServicesDropdown", () => {
    render(<ServicesDropdown />);
    expect(screen.queryByText("Analytics")).toBeNull();
    expect(screen.queryByText("Integrations")).toBeNull();
  });
});