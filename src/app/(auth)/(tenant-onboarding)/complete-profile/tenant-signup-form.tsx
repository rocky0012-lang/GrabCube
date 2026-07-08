"use client"

import * as React from "react"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, MailCheck } from "lucide-react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css";
import { isPossiblePhoneNumber } from 'react-phone-number-input'
import Link from "next/link"
import { validateAccount } from "@/lib/api/account-validation"
import { BackButton } from "../reusable/back-button"
// Supabase client
import { createClient } from "@/lib/supabase/client"



// Import updated Shadcn primitives
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldError,
  FieldTitle,
} from "@/components/ui/field"
import { CubeGrabLogo } from "../reusable/cubegrab-logo"
import SocialAuthButtons from "../ui/social-auth-button"
import Separator from "../reusable/separator"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Validation Rules
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Please input a valid email address."),
  phoneNumber: z.string()
    .min(1, "Phone number is required.")
    .refine((value) => isPossiblePhoneNumber(value || ''), {
      message: "Please enter a valid phone number.",
    }),
  password: z.string().min(8, "Password must contain 8+ characters."),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

type SignupValues = z.infer<typeof signupSchema>

export function TenantSignupForm() {
    const [formError, setFormError] = React.useState<string | null>(null)
    const [formSuccess, setFormSuccess] = React.useState(false)
    //create a supabase client
    const supabase = createClient()
  // Password UI Toggles
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const user_role = "tenant" // Hidden field value
  const router = useRouter()

  useEffect(() => {
        if (!formSuccess) return;
        
        const { data: { subscription },
        } = supabase.auth.onAuthStateChange((event) => {
          if (event === 'SIGNED_IN') {
            router.replace("/tenant/complete-profile");
          }
        });
  
        return () => {
          subscription.unsubscribe();
        };
      }, [formSuccess, router]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  // Watch values for custom primitives (Checkbox)
  const termsValue = watch("terms")

  async function onSubmit(data: SignupValues) {
    setFormError(null)

    try {
      const validation = await validateAccount(
        data.email,
        data.phoneNumber
      );
    
      if (!validation.canCreateAccount) {
        setFormError(
          "Unable to create your account. Please review your information or sign in if you already have an account."
        );
        return;
      }
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred."
      );
      return;
    }
    
    const { error: signUpError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/callback?next=/email-confirmed`,
        data: {
          full_name: `${data.firstName} ${data.lastName}`,
          phone_number: data.phoneNumber,
          verification_status: "pending",
          user_role: user_role,
        },
      },
    })
    
    if (signUpError) {
      setFormError(signUpError.message)
      return
    }
    
     setFormSuccess(true)
    }

    if (formSuccess) {
      return (
        <Card className="w-full max-w-xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We sent a confirmation link to your email address. Please verify your account to continue.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <MailCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-sm text-muted-foreground">
                We've sent a verification link to your email address.
              </p>
              
              <p className="text-sm text-muted-foreground">
                After verifying your email, you'll be automatically signed in and redirected
                to complete your profile.
              </p>
            </div>
            <div className="rounded-lg border bg-muted/40 p-4 text-sm text-muted-foreground">
              <p className="font-medium mb-2">Next steps</p>

              <ol className="list-decimal space-y-1 pl-5">
                <li>Open the email we just sent.</li>
                <li>Click the verification link.</li>
                <li>You'll be signed in automatically.</li>
                <li>Complete your profile.</li>
              </ol>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Didn't receive the email? Check your spam or junk folder.
            </p>
          </CardContent>
        </Card>
      )
    }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-6 px-2">
      {/* Back Button */}
      <div className="w-full max-w-xl">
        <BackButton href="/" />
      </div>

      <div className="text-center mb-8 mt-0">
        <CubeGrabLogo />
      </div>
      <div className="w-full max-w-xl mx-auto mb-6">
        <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-2xl max-w-xl mx-auto">
          Create a Tenant account
        </p>
        <h3>Find your perfect space</h3>
      </div>
    <Card className="w-full max-w-xl mx-auto bg-[var(--color-bg-secondary-base)]/10 dark:bg-[var(--color-bg-primary-base)]/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* First & Last Name row */}
          <div className="grid grid-cols-2 gap-4">
            <Field data-invalid={!!errors.firstName}>
              <FieldLabel>First Name</FieldLabel>
              <FieldContent>
                <Input placeholder="Jane" {...register("firstName")} />
              </FieldContent>
              <FieldError>{errors.firstName?.message}</FieldError>
            </Field>

            <Field data-invalid={!!errors.lastName}>
              <FieldLabel>Last Name</FieldLabel>
              <FieldContent>
                <Input placeholder="Doe" {...register("lastName")} />
              </FieldContent>
              <FieldError>{errors.lastName?.message}</FieldError>
            </Field>
          </div>

          {/* Email field */}
          <Field data-invalid={!!errors.email}>
            <FieldLabel>Email Address</FieldLabel>
            <FieldContent>
              <Input type="email" placeholder="jane.doe@example.com" {...register("email")} />
            </FieldContent>
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          {/* Combined Country Dropdown & Phone field */}
            <Field data-invalid={!!errors.phoneNumber}>
                <FieldLabel>Phone Number</FieldLabel>

                <FieldContent>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        international
                        defaultCountry="KE"
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full rounded-md border px-3 py-2"
                      />
                    )}
                  />
                </FieldContent>
                <FieldError>{errors.phoneNumber?.message}</FieldError>
            </Field>

          {/* Password with Eye Icon */}
          <Field data-invalid={!!errors.password}>
            <FieldLabel>Password</FieldLabel>
            <FieldContent className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </FieldContent>
            <FieldError>{errors.password?.message}</FieldError>
          </Field>

          {/* Confirm Password with Eye Icon */}
          <Field data-invalid={!!errors.confirmPassword}>
            <FieldLabel>Confirm Password</FieldLabel>
            <FieldContent className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-10"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </FieldContent>
            <FieldError>{errors.confirmPassword?.message}</FieldError>
          </Field>

          {/* Terms checkbox */}
          
            <Field data-invalid={!!errors.terms} 
              className="flex flex-col gap-4 items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FieldLabel>
              <FieldContent>
                <Checkbox
                  id="terms"
                  checked={termsValue}
                  onCheckedChange={(checked) => setValue("terms", checked === true, { shouldValidate: true })}
                />
              </FieldContent>
              <div className="space-y-1 leading-none">
                <FieldLabel htmlFor="terms" className="cursor-pointer">Accept terms and conditions</FieldLabel>
                <FieldDescription>
                  You agree to our system Terms of Service and Privacy Policy.
                </FieldDescription>
                <FieldError>{errors.terms?.message}</FieldError>
              </div>
            </FieldLabel>
            <FieldLabel>
              <Field orientation="horizontal">
                <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                <FieldContent>
                  <FieldTitle>Enable notifications</FieldTitle>
                  <FieldDescription>
                    You can enable or disable notifications at any time.
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </Field>

          {formError && (
            <p className="text-sm font-normal text-destructive">{formError}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full h-8 bg-[var(--color-accent-gold)] hover:bg-[var(--color-accent-gold-dark)] text-black text-lg font-medium">
            {isSubmitting ? "Registering..." : "Complete Registration"}
          </Button>
        </form>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 text-center pt-2">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[var(--color-accent-gold)] hover:underline">
            Sign in
          </Link>
        </p>
        <Separator />
        <SocialAuthButtons />
      </CardContent>
    </Card>
    </main>
  )
}
