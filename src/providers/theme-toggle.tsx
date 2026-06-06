"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/base/buttons/button";
 import { useEffect, useState } from "react";
import { Moon01, Sun } from "@untitledui/icons";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {setMounted(true)}, []);
    if (!mounted) return null;

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            aria-label="Toggle theme"
            color="tertiary"
            size="sm"
            iconLeading={isDark ? Sun : Moon01}
            onClick={() => setTheme(isDark ? "light" : "dark")}
        />
    );
}
     
    