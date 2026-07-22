'use client'

import { LogOut01 } from "@untitledui/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useLogout } from "@/components/reusable/logout-action";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dropdown } from "../base/dropdown/dropdown";

interface LogoutButtonProps {
    buttonText?: string;
    redirectTo: string;
    dropdown?: boolean;
}

export default function LogoutDialog({
    redirectTo, 
    buttonText = "Log Out", 
    dropdown = false,
}: LogoutButtonProps) {

    const [open, setOpen] = useState(false);
    const logout = useLogout(redirectTo);

    return (
        <AlertDialog 
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                {dropdown ? (
                    <Dropdown.Item 
                        icon={LogOut01}
                        className="text-red-500"
                    >
                        {buttonText}
                    </Dropdown.Item>
                ) : (
                    <Button
                        variant="outline"
                        className="border-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold)] hover:text-black"
                    >
                        <LogOut01 className="mr-2 h-4 w-4" />
                        {buttonText}
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sign out?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to to sign out of your CubeGrab account? You will need to sign in again to continue.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={logout} className="bg-red-500 text-white hover:bg-red-600">
                        Sign Out
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}