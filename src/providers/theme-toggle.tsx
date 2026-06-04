"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/base/buttons/button";
import { Moon01, Sun } from "@untitledui/icons";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            aria-label="Toggle theme"
            color="tertiary"
            size="sm"
            iconLeading={theme === "dark" ? Sun : Moon01}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
    );
}