'use client'

import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogout(redirectTo: string) {
    const router = useRouter();
    const supabase = createClient();

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) throw error;

            toast.success("Successfully logged out!");

            setTimeout(() => {
                router.replace(redirectTo);
                router.refresh();
            }, 800);

        } catch (error) {
            console.error(error);

            toast.error("Unable to log out. Please try again.");
        }
    };

    return logout;
}