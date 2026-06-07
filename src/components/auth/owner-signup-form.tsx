"use client"

import * as React from "react"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"

import { createClient } from "@/lib/supabase/client"
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
} from "@/components/ui/field"

const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email("Please input a valid email address."),
  phoneNumber: z.string().min(10, "Please enter a valid phone number."),
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

export function OwnerSignupForm() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [formError, setFormError] = React.useState<string | null>(null)
  const [formSuccess, setFormSuccess] = React.useState(false)

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

  const termsValue = watch("terms")

  async function onSubmit(data: SignupValues) {
    setFormError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: `${data.firstName} ${data.lastName}`,
          phone_number: data.phoneNumber,
        },
      },
    })

    if (error) {
      setFormError(error.message)
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
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create an owner account</CardTitle>
        <CardDescription>Fill out the fields below to register</CardDescription>
      </CardHeader>
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

          {/* Phone field */}
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
          <Field
            data-invalid={!!errors.terms}
            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm"
          >
            <FieldContent>
              <Checkbox
                id="terms"
                checked={termsValue}
                onCheckedChange={(checked) =>
                  setValue("terms", checked === true, { shouldValidate: true })
                }
              />
            </FieldContent>
            <div className="space-y-1 leading-none">
              <FieldLabel htmlFor="terms" className="cursor-pointer">
                Accept terms and conditions
              </FieldLabel>
              <FieldDescription>
                You agree to our system Terms of Service and Privacy Policy.
              </FieldDescription>
              <FieldError>{errors.terms?.message}</FieldError>
            </div>
          </Field>

          {formError && (
            <p className="text-sm font-normal text-destructive">{formError}</p>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Registering..." : "Complete Registration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
