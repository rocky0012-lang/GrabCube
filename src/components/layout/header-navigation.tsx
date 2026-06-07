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
        <Link href="/pricing">Pricing</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/about">About</Link>
      </nav>
        <Button href="/sign-in"
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
    </header>
  );
}