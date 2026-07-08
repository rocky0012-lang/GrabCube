"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/providers/theme-toggle";
import { Button } from "../base/buttons/button";
import { ProductsDropdown, ServicesDropdown, productItems, servicesItems } from "../reusable/onboard-dropdown";

export default function HeaderNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Link href="/" className="shrink-0">
          <Image src="/images/CubeGrab.png" alt="CubeGrab logo" height={78} width={78} priority />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
          <ProductsDropdown />
          <ServicesDropdown />
          <Link href="/pricing">Pricing</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="ml-auto hidden items-center gap-4 md:flex">
          <ThemeToggle />
          <Button
            href="/get-started"
            className="rounded-lg bg-(--color-accent-gold) text-white shadow-sm transition-colors duration-200 hover:bg-(--color-accent-gold-dark)"
          >
            Get Started
          </Button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen((value) => !value)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-lg border border-black/10 text-black transition-colors hover:bg-black/5 md:hidden dark:border-white/10 dark:text-white dark:hover:bg-white/10"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="mt-4 rounded-2xl border border-black/10 bg-background p-4 shadow-sm md:hidden dark:border-white/10">
          <nav className="flex flex-col gap-5">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-black/60 dark:text-white/60">Products</p>
              <div className="grid gap-2">
                {productItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-black/60 dark:text-white/60">Services</p>
              <div className="grid gap-2">
                {servicesItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-2 border-t border-black/10 pt-4 dark:border-white/10">
              <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                Pricing
              </Link>
              <Link href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                Resources
              </Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="rounded-lg px-3 py-2 transition-colors hover:bg-black/5 dark:hover:bg-white/10">
                About
              </Link>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-4 dark:border-white/10">
              <ThemeToggle />
              <Button href="/get-started" className="flex-1 rounded-lg bg-(--color-accent-gold) text-white shadow-sm transition-colors duration-200 hover:bg-(--color-accent-gold-dark)">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}