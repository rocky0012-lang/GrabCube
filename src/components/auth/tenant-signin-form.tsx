'use client'

import * as React from "react"
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { useRouter } from "next/navigation"
import { CubeGrabLogo } from "@/components/reusable/cubegrab-logo"
import SocialAuthButtons from "@/components/ui/social-auth-button"
import Separator from "@/components/reusable/separator"
import Link from "next/link"
import { BackButton } from "../reusable/back-button"
const signinSchema = z.object({
  email: z.string().email("Please input a valid email address."),
  password: z.string().min(8, "Password must contain 8+ characters."),
})

type SigninValues = z.infer<typeof signinSchema>

export function TenantSigninForm() {
    const [formError, setFormError] = React.useState<string | null>(null)
    const router = useRouter()
    const { register, 
            handleSubmit, 
            formState: { errors, isSubmitting },
            } = useForm<SigninValues>({
                resolver: zodResolver(signinSchema),
                defaultValues: {
                    email: "",
                    password: "",
                },
            })

            async function onSubmit(data: SigninValues) {
                 setFormError(null)
                try {
                const supabase = createClient()
                const { error } = await supabase.auth.signInWithPassword({
                  email: data.email,
                  password: data.password,
                })
                if (error) {
                  setFormError(error.message)
                  return;
                }

                //Get the authenticated user
                const { data: { user }, error: userError } = await supabase.auth.getUser();

                 if (userError || !user) {
                  await supabase.auth.signOut();
                  setFormError("User not found.");
                  return;
                }

                // Check if the user has the "tenant" role
                const { data: profile, error: profileError } = await supabase
                  .from("users")
                  .select("user_role")
                  .eq("id", user.id)
                  .single();

                if (profileError || !profile) {
                  await supabase.auth.signOut();
                  setFormError("Unable to verify your account.");
                  return;
                }

                // If the user is not a tenant, sign them out and show an error
                if (profile.user_role !== "tenant") {
                  await supabase.auth.signOut();
                  setFormError("This account is not registered as a tenant. Please use the correct sign-in page.");
                  return;
                }

                // If the user is a tenant, redirect to the tenant dashboard
                router.replace("/tenant/dashboard") // Redirect to tenant dashboard on successful sign-in
              } catch {
                setFormError("Something went wrong. Please try again.")
              }
                // Handle success (e.g., redirect)
              }
    return (
        <>
          {/* Back Button */}
            <div className="w-full max-w-xl">
              <BackButton href="/" />
            </div>
          <div className="text-center mb-8">
            <CubeGrabLogo 
              width={208}
              height={208}
            />
          </div>
          <div className="w-full max-w-xl mx-auto mb-6 px-4">
          <p className="text-zinc-600 dark:text-zinc-400 gap-2.5 text-2xl max-w-xl mx-auto">
            Tenant Sign In
          </p>
          <h3>Log in to find your perfect space.</h3>
          </div>
        <Card className="w-full max-w-xl mx-auto bg-[var(--color-bg-secondary-base)]/10 dark:bg-[var(--color-bg-primary-base)]/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl">
          <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              <Field data-invalid={!!errors.email}>
              <FieldLabel>Email Address</FieldLabel>
              <FieldContent>
                <Input type="email" placeholder="jane.doe@example.com" {...register("email")} className="h-10" />
              </FieldContent>
              <FieldError>{errors.email?.message}</FieldError>
            </Field>

              <Field data-invalid={!!errors.password}>
                <FieldLabel>Password</FieldLabel>
                <FieldContent>
                  <Input type="password" placeholder="••••••••" {...register("password")} className="h-10" />
                </FieldContent>
                <FieldError>{errors.password?.message}</FieldError>
              </Field>
              {formError && (
                <p className="text-sm font-normal text-destructive">{formError}</p>
              )}
              <Button type="submit" disabled={isSubmitting} className="w-full h-8 bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-dark)] text-black text-lg">
                  {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
          </form>
          <div className="flex items-center justify-between mt-2.5">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-[var(--color-accent-gold)] hover:underline"
              >
                Sign up
              </Link>
            </p>
                      
            <Link
              href="/forgot-password?returnTo=/sign-in"
              className="text-sm text-[var(--color-accent-gold)] hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <Separator />
          <SocialAuthButtons />
          </CardContent>
        </Card>
        </>
    )
}