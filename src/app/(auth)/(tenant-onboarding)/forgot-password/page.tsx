'use client'

import * as React from "react"
import { Input } from '@/components/base/input/input';
import { KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from "next/navigation"

type ForgotPasswordFormValues = {
  email: string;
};

const ForgotPassword = () => {
   const [formError, setFormError] = React.useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting },
        } = useForm<ForgotPasswordFormValues>({
            resolver: zodResolver(
                z.object({
                    email: z.string().email("Please input a valid email address."),
                })
            ),
        });

        const supabase = createClient();

        const onSubmit = async (data: ForgotPasswordFormValues) => {
           setFormError(null)
          const { error } = await supabase.auth.resetPasswordForEmail(
            data.email,
            {
              redirectTo: `${window.location.origin}/reset-password`,
            }
          );
      
          if (error) {
             setFormError(error.message)
          }
        };


  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-80">
            <KeyRound /> 
            <h1 className="flex text-3xl font-medium items-center">Forgot Password?</h1> 
            <p className="text-md text-center text-secondary">Enter your email address and we will send you a link to reset your password.</p> 
            <div> 
                <label htmlFor="email" className="flex pb-1">Email</label> 
                <Input 
                    id="email"
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-80"
                    {...register("email")} 
                /> 
                 {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
            </div> 
            <Button type="submit" disabled={isSubmitting} className="w-full h-8 bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-dark)] text-black text-lg"> 
                {isSubmitting ? "Sending..." : "Send Reset Link"} </Button> 
                {formError && <p className="mt-2 text-sm text-destructive">{formError}</p>}
        </form>
    </main>
  )
}

export default ForgotPassword
