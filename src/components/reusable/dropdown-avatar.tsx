'use client'

import { useState } from "react";
import { HelpCircle, LayersTwo01, LogOut01, Moon01, Settings01, User01 } from "@untitledui/icons";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/lib/utils/cx";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { useProfile } from "@/hooks/use-profile";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";


export const DropdownAvatar = () => {
    const { profile, loading } = useProfile();

    const { resolvedTheme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);
    const isDark = mounted && resolvedTheme === "dark";
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout failed:", error);
        return;
      }

      router.replace("/signin");
      router.refresh();
    };

    


    return (
        <Dropdown.Root>
            <AriaButton
                className={({ isPressed, isFocusVisible }) =>
                    cx(
                        "group relative inline-flex cursor-pointer rounded-full outline-offset-2 ring-[var(--color-accent-gold)]",
                        (isPressed || isFocusVisible) && "outline-2",
                    )
                }
            >
                <Avatar alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" size="sm" />
            </AriaButton>

            <Dropdown.Popover className="w-60">
                <div className="flex gap-3 border-b border-secondary p-3">
                    <AvatarLabelGroup
                        size="md"
                        src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80"
                        status="online"
                        title={loading ? "Loading..." : profile?.full_name}
                        subtitle={loading ? "Loading..." : profile?.email}
                    />
                </div>
                <Dropdown.Menu>
                    <Dropdown.Item icon={User01}>
                        View profile
                    </Dropdown.Item>
                    <Dropdown.Item icon={Settings01} href="/settings">
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Section selectionMode="single" selectedKeys={new Set([isDark ? "dark-mode" : "light-mode"])}>
                        {mounted && (
                            <Dropdown.Item id="dark-mode" icon={Moon01} selectionIndicator="toggle" onAction={() => setTheme(isDark ? "light" : "dark")}>
                                {isDark ? "Light mode" : "Dark mode"}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Section>

                    <Dropdown.Separator />

                    <Dropdown.Item icon={LayersTwo01}>
                        Changelog
                    </Dropdown.Item>

                    <SubmenuTrigger>
                        <Dropdown.Item icon={HelpCircle}>Support</Dropdown.Item>

                        <Dropdown.Popover placement="right top" offset={-6}>
                            <Dropdown.Menu>
                                <Dropdown.Item>Help center</Dropdown.Item>
                                <Dropdown.Item>Contact support</Dropdown.Item>
                                <Dropdown.Item>Send feedback</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </SubmenuTrigger>

                </Dropdown.Menu>
                <div className="flex flex-col gap-3 border-t border-secondary p-3">
                    <Button size="xs" color="secondary-destructive" iconLeading={LogOut01} className="text-center hover:bg-red-500 hover:text-white transition-colors" onClick={handleLogout} >
                        Sign out
                    </Button>
                </div>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};