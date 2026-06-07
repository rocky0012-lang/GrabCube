"use client";

import { ChevronDown } from "lucide-react";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button } from "../base/buttons/button";


type MenuItem = {
  label: string;
  href: string;
}

type NavigationDropdownProps ={
  label: string;
  items: MenuItem[];
}

function NavigationDropdown({ label, items }: NavigationDropdownProps) {
  return (
    <Dropdown.Root>
            <Button className="font-medium">
              <span className="inline-flex items-center gap-2">
                {label}
                <ChevronDown className="h-4 w-4" />
              </span>
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu>
                {items.map((item) => (
                  <Dropdown.Item key={item.href} href={item.href}>
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown.Popover>
    </Dropdown.Root>
  );
}


const productItems = [
  {label: "Analytics", href: "/products/analytics"},
  {label: "Automation", href: "/products/automation"},
  {label: "Reports", href: "/products/reports"},
  {label: "Integrations", href: "/products/integrations"},
];
const servicesItems = [
  {label: "Web Development", href: "/services/web-development"},
  {label: "UI/UX Design", href: "/services/ui-ux-design"},
  {label: "Consulting", href: "/services/consulting"},
  {label: "Support", href: "/services/support"},
];

export function ProductsDropdown() {
  return <NavigationDropdown label="Products" items={productItems} />;
}

export function ServicesDropdown() {
  return <NavigationDropdown label="Services" items={servicesItems} />;
}
  

