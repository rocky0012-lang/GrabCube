"use client";

import { ChevronDown } from "lucide-react";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button } from "../base/buttons/button";

export function ProductsDropdown() {
  return (
    <Dropdown.Root>
            <Button className="font-medium">
              <span className="inline-flex items-center gap-2">
                Products
                <ChevronDown className="h-4 w-4" />
              </span>
            </Button>


            <Dropdown.Popover>
              <Dropdown.Menu>
                <Dropdown.Item href="/products/analytics">
                  Analytics
                </Dropdown.Item>

                <Dropdown.Item href="/products/automation">
                  Automation
                </Dropdown.Item>

                <Dropdown.Item href="/products/reports">
                  Reports
                </Dropdown.Item>

                <Dropdown.Item href="/products/integrations">
                  Integrations
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
    </Dropdown.Root>
  );
}

export function ServicesDropdown() {
  return (
    <Dropdown.Root>
      <Button className="font-medium">
        <span className="inline-flex items-center gap-2">
          Services
          <ChevronDown className="h-4 w-4" />
        </span>
      </Button>

      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item href="/services/web-development">
            Web Development
          </Dropdown.Item>

          <Dropdown.Item href="/services/ui-ux-design">
            UI/UX Design
          </Dropdown.Item>

          <Dropdown.Item href="/services/consulting">
            Consulting
          </Dropdown.Item>

          <Dropdown.Item href="/services/support">
            Support
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}