// app/profiles/page.tsx
import { createClient } from '@/lib/supabase/server'
import  LogoutButton  from '@/components/reusable/logoutbutton'

export default async function ProfilesPage() {
  const supabase = await createClient()
  

  return (
    <main className="flex justify-between p-6">
      <h1 className="text-xl font-bold">Profiles</h1>
      <LogoutButton />
    </main>
  )
}
