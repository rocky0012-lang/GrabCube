import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
    id: string;
    full_name: string;
    email: string;
    phone_number: string;
    user_role: string;
};

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadProfile = async () => {
            const supabase = createClient();

            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (cancelled) return;

            if (authError || !user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("users")
                .select("id,full_name, email, phone_number, user_role")
                .eq("id", user.id)
                .single();

            if (cancelled) return;

            if (error) {
                console.error("Failed to load profile:", error);
            } else {
                setProfile(data);
            }

            if (!cancelled) {
                setLoading(false);
            }
        };

        loadProfile();

        return () => {
            cancelled = true;
        };

    }, []);
        return {
        profile,
        loading,
    };
}