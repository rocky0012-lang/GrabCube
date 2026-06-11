import { OwnerSigninForm } from "@/components/auth/owner-signin-form"
import { Button } from "@/components/ui/button"

const OwnerSignInPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <OwnerSigninForm />
      {/* <Button variant="outline" className="w-full bg-[var(--color-accent-gold-dark)] text-white hover:bg-[var(--color-accent-gold-light)]">
        Sign in with Google
      </Button> */}
    </main>
  )
}

export default OwnerSignInPage
