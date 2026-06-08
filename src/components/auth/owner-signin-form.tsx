import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { register } from 'module'
import { error } from 'console'

const signinSchema = z.object({
  email: z.string().email("Please input a valid email address."),
  password: z.string().min(8, "Password must contain 8+ characters."),
})

async function onSubmit(data: SigninValues) {
    setFormError(null)


const supabase = createClient()
// ---cut---
async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'email',
    password: 'password',
  })
}

if (error) {
      setFormError(error.message)
      return
    }

export function OwnerSigninForm() {
    const [formError, setFormError] = React.useState<string | null>(null)
    return (
        <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Log in to manage your listing
          </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <Field data-invalid={!!errors.email}>
            <FieldLabel>Email Address</FieldLabel>
            <FieldContent>
              <Input type="email" placeholder="jane.doe@example.com" {...register("email")} />
            </FieldContent>
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

            <Field data-invalid={!!errors.password}>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input type="password" placeholder="••••••••" {...register("password")} />
              </FieldContent>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>
          </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
        </form>
        </CardContent>
      </Card>
    )
}