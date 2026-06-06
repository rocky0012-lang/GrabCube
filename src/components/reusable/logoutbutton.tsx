// app/components/LogoutButton.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/sign-in') // Redirect to sign-in page after logout
    router.refresh() // Refreshes the server state
  }

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-900 text-white px-4 py-2 rounded">
      Log Out
    </Button>
  )
}
