// app/components/LogoutButton.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useState } from 'react'

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/sign-in') // Redirect to sign-in page after logout
      router.refresh() // Refreshes the server state
    } catch (err) {
      console.error('Logout failed:', err)

      setError("Failed to logout. Please try again.") // Optionally, you can show an error message to the user here
    }
  }

  return (
    <div>
      <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-900 text-white px-4 py-2 rounded">
        Log Out
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  )
}
