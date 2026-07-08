'use client'

import * as React from "react"
import { Input } from '@/components/ui/input';
import { KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { BackButton } from '@/components/reusable/back-button';
import { useSearchParams } from 'next/navigation';

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPasswordForm = () => {
  const searchParams = useSearchParams();
  const allowedRoutes = ["/sign-in", "/owner-signin"];
  const returnTo = searchParams.get("returnTo");
  const backHref = allowedRoutes.includes(returnTo ?? "")
    ? returnTo!
    : "/sign-in";
   const [formError, setFormError] = React.useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting },
        } = useForm<ForgotPasswordFormValues>({
            resolver: zodResolver(
                z.object({
                    email: z.email({ error: "Please input a valid email address." }),
                })
            ),
        });

        const supabase = createClient();
        const [resetEmailSent, setResetEmailSent] = React.useState(false);

        const onSubmit = async (data: ForgotPasswordFormValues) => {
           setFormError(null)
            setResetEmailSent(false)
            try {
              const { error } = await supabase.auth.resetPasswordForEmail(
                data.email,
                {
                  redirectTo: `${window.location.origin}/reset-password`,
                }
              );
              if (error) {
                setFormError(error.message)
              } else {
                setResetEmailSent(true)
              }
            } catch {
              setFormError("Something went wrong. Please try again.")
            }
        };


  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full max-w-md flex-col gap-4 items-center">
            <div className="inline-flex items-center justify-center w-12 h-12 border border-[var(--color-accent-gold)] rounded-xl mb-6">
              <KeyRound className="w-6 h-6 text-[var(--color-accent-gold)]" />
            </div> 
            <h1 className="flex text-3xl font-medium items-center">Forgot Password?</h1> 
            <p className="text-md text-center text-secondary">Enter your email address and we will send you a link to reset your password.</p> 
            <div className="flex flex-col gap-1 w-full"> 
                <label htmlFor="email" className="flex pb-1">Email</label> 
                <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")} 
                /> 
                 {errors.email && (
                  <p id="email-error" role="alert" aria-live="polite" className="mt-1 text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
            </div> 
            <Button type="submit" disabled={isSubmitting} className="w-full h-8 bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-dark)] text-black text-lg mt-2"> 
                {isSubmitting ? "Sending..." : "Send Reset Link"} </Button> 
                {!formError && resetEmailSent && (
                  <p
                    role="status"
                    aria-live="polite"
                    className="mt-2 text-sm text-green-600"
                  >
                    If an account exists for this email address, you'll receive a password reset link shortly.
                  </p>
                )}
                <div className="flex justify-center w-full mt-2">
                      <BackButton
                        href={backHref} 
                        label="Back to Sign In" 
                      />
                </div>
        </form>
    </div>
  )
}

export default ForgotPasswordForm
