'use client'

import { useState } from "react";
import { ChevronDown, HelpCircle, LogOut01, Moon01, Plus, Settings01, User01 } from "@untitledui/icons";
import type { Selection } from "react-aria-components";
import { Button as AriaButton, SubmenuTrigger } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { cx } from "@/lib/utils/cx";
import LogoutButton from "./logoutbutton";
import { useProfile } from "@/hooks/use-profile";
import { useTheme } from "next-themes";


export const DropdownAccountCardSM = () => {
    const { profile, loading } = useProfile();

    const [selectedAccount, setSelectedAccount] = useState<Selection>(new Set(["olivia"]));
    const { resolvedTheme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState(false);
    const isDark = mounted && resolvedTheme === "dark";

    return (
        <Dropdown.Root>
            <AriaButton
                className={({ isPressed, isFocused }) =>
                    cx(
                        "relative flex w-46 cursor-pointer items-center gap-2 rounded-lg p-1.5 text-left inset-ring-1 inset-ring-border-secondary outline-offset-2 ring-[var(--color-accent-gold)]",
                        (isPressed || isFocused) && "outline-2",
                    )
                }
            >
                <Avatar border size="sm" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" status="online" />

                <p className="text-sm font-semibold ">{loading ? "Loading..." : profile?.full_name}</p>

                <div className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-md">
                    <ChevronDown className="size-4 shrink-0 stroke-[2.25px]" />
                </div>
            </AriaButton>

            <Dropdown.Popover className="w-60">
                <div className="flex flex-col border-b border-secondary px-4 py-3">
                    <p className="text-sm font-semibold text-primary">PRO account</p>
                    <p className="text-sm text-tertiary">{loading ? "" : profile?.email}</p>
                </div>
                <Dropdown.Menu>
                    <Dropdown.Item icon={User01}>
                        View profile
                    </Dropdown.Item>
                    <Dropdown.Item icon={Settings01} href="/settings">
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Section selectionMode="single" selectedKeys={new Set([isDark ? "dark-mode" : "light-mode"])}>
                        {mounted && (<Dropdown.Item id="dark-mode" icon={Moon01} selectionIndicator="toggle" onAction={() => setTheme(isDark ? "light" : "dark")}>
                            {isDark ? "Light mode" : "Dark mode"}
                        </Dropdown.Item>)}
                    </Dropdown.Section>

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

                    <Dropdown.Separator />

                    <Dropdown.Section selectionMode="single" selectedKeys={selectedAccount} onSelectionChange={setSelectedAccount}>
                        <Dropdown.SectionHeader className="px-4 pt-1.5 pb-0.5 text-xs font-semibold text-brand-secondary">
                            Switch Account
                        </Dropdown.SectionHeader>

                        <Dropdown.Item id="olivia" avatarUrl="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80" selectionIndicator="radio">
                            {loading ? "Loading..." : profile?.full_name}
                        </Dropdown.Item>
                        <Dropdown.Item id="sienna" avatarUrl="https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80" selectionIndicator="radio">
                            Sienna Hewitt
                        </Dropdown.Item>
                    </Dropdown.Section>

                    <Dropdown.Item icon={Plus}>Add account</Dropdown.Item>

                    <Dropdown.Separator />

                    
                </Dropdown.Menu>
                <div className="mb-2">
                    <LogoutButton />
                </div>
                <div className="flex justify-between border-t border-secondary px-4 py-3">
                    <span className="truncate text-sm text-quaternary">&copy; CubeGrab Inc</span>
                    <span className="text-sm text-quaternary">2026</span>
                </div>
            </Dropdown.Popover>
        </Dropdown.Root>
    );
};