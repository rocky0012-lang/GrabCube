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

    const { data: emailUser, error: emailError } = await serviceRoleClient
        .from("users")
        .select("id")
        .eq("email", email)
        .maybeSingle();

    if (emailError) {
      console.error("Error occurred while fetching email user:", emailError);
      return NextResponse.json(
        {
          error: "Internal server error.",
        },
        { status: 500 }
      );
    }

    const { data: phoneUser, error: phoneError } = await serviceRoleClient
        .from("users")
        .select("id")
        .eq("phone_number", phoneNumber)
        .maybeSingle();

    if (phoneError) {
      console.error("Error occurred while fetching phone user:", phoneError);
      return NextResponse.json(
        {
          error: "Internal server error.",
        },
        { status: 500 }
      );
    }
    
    const canCreateAccount = !emailUser && !phoneUser;

    return NextResponse.json({
      canCreateAccount,
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