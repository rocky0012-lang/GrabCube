import { ProductsDropdown, ServicesDropdown } from "../reusable/onboard-dropdown";
import { Button } from "../base/buttons/button";
import Link from "next/link";



export default function HeaderNavigation() {
  return (
    <header className="flex items-center justify-between bg-color-n px-6 py-4">
      <div className="font-bold text-xl">Logo</div>

      <nav className="flex items-center gap-12">
        <ProductsDropdown />
        <ServicesDropdown />
        <a href="/pricing">Pricing</a>
        <a href="/resources">Resources</a>
        <a href="/about">About</a>
      </nav>
      <Link href="/sign-in">
        <Button
          className="
            bg-[var(--color-accent-gold)]
            text-white
            hover:bg-[var(--color-accent-gold-dark)]
            transition-colors
            duration-200
            rounded-lg
            shadow-sm
          ">
          Get Started
        </Button>
      </Link>
    </header>
  );
}