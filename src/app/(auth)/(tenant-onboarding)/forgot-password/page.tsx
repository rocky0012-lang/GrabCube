import ForgotPasswordForm from "@/components/auth/forgot-password-form"
import { Suspense } from "react"


const ForgotPasswordPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center py-2 px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </main>
  )
}

export default ForgotPasswordPage
