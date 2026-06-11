import { ProductsDropdown, ServicesDropdown } from "../reusable/onboard-dropdown";
import { Button } from "../base/buttons/button";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/providers/theme-toggle";



export default function HeaderNavigation() {
  return (
    <header className="flex items-center px-6 py-4">
        <Link href={"/"}>
          <div>
            <Image 
              src="/images/CubeGrab.png"
              alt="onboard-LOogo"
              height={78}
              width={78}
              />
          </div>
        </Link>
        <nav className="flex flex-1 items-center justify-center gap-12">
          <ProductsDropdown />
          <ServicesDropdown />
          <Link href="/pricing">Pricing</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/about">About</Link>
        </nav>
      <div className="flex items-center gap-4 ml-auto">
        <ThemeToggle />
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
      </div>
    </header>
  );
}