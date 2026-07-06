import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
    href: string;
    label?: string;
    showIcon?: boolean;
    className?: string;
}

export function BackButton({
    href,
    label = "Back",
    showIcon = true,
    className = "",
}: BackButtonProps) {
    return (
        <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-bold transition-all hover:bg-[var(--color-bg-secondary-base)] hover:text-[var(--color-accent-gold)] ${className}`}
        >
            {showIcon && <ArrowLeft className="size-4" />}
            <span>{label}</span>
        </Link>
    );
}
