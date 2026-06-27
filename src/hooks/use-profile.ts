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
        const loadProfile = async () => {
            const supabase = createClient();

            const { data: { user}, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.id)
                .single();

            if (!error) {
                setProfile(data);
            }

            setLoading(false);
        };

        loadProfile();
    }, []);

    return { profile, loading };
}