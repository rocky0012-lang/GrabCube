import { Button } from "@/components/ui/button"
import React from "react"

const OwnerSignInPage = () => {
  return (
    <>
      <Button variant="outline" className="w-full bg-[var(--color-accent-gold-dark)] text-white hover:bg-[var(--color-accent-gold-light)]">
        Sign in with Google
      </Button>
    </>
  )
}

export default OwnerSignInPage
