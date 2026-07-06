import { CubeGrabLogo } from '@/components/reusable/cubegrab-logo'
import { BackButton } from '@/components/reusable/back-button'
import React from 'react'
import { Building, Search } from 'lucide-react'
import RoleSelectionCard from '@/components/reusable/roleSelectionCard'

const roleOptions = [
  {
    title: "Looking for a place",
    description: "Browse available properties and find your next place.",
    href: "/sign-in",
    buttonText: "Continue as a Tenant",
    icon: Search,
  },
  {
    title: "Listing a place",
    description: "Advertise your property and connect with potential tenants.",
    href: "/owner-signin",
    buttonText: "Continue as an Owner",
    icon: Building,
  }
]

const GetStartedPage = () => {
  return (
    <main className="min-h-screen px-6 py-8">
      {/* Top Navigation */}
      <div className="mx-auto w-full max-w-3xl">
        <BackButton
          href="/"
          label="Back"
          showIcon
        />
      </div>
      <div className="mt-6 flex flex-col items-center text-center">
        <CubeGrabLogo />
        <div className="flex flex-col items-center justify-center gap-4 pt-8">
            <h1 className="text-2xl font-bold">How would you like to continue?</h1>
            <p className="text-lg text-[color:var(--color-text-secondary)]">Choose the option that best describes you</p>
        </div>
        <div className="flex flex-col gap-12 w-full max-w-3xl mt-6">
          {roleOptions.map((role) => (
            <RoleSelectionCard
              key={role.href}
              title={role.title}
              description={role.description}
              href={role.href}
              buttonText={role.buttonText}
              icon={role.icon}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default GetStartedPage
