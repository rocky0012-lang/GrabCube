import { serviceRoleClient } from "@/lib/supabase/service-role";

import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {

    const { email, phoneNumber } = await request.json();

    if (!email || !phoneNumber) {
      return NextResponse.json(
        {
          error: "Email and phone number are required.",
        },
        { status: 400 }
      );
    }

    const { data: phoneUser } = await serviceRoleClient
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

    const { data: emailUser } = await serviceRoleClient
        .from("users")
        .select("id")
        .eq("phone_number", phoneNumber)
        .maybeSingle();

    return NextResponse.json({
      emailExists: false,
      phoneExists: false,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error.",
      },
      { status: 500 }
    );
  }
}