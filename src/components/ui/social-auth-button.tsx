'use client'

import { createClient } from '@/lib/supabase/client'
import SocialButton from '../auth/social-button'
import Image from 'next/image'


type provider = "google" | "github" | "facebook"

type providerType = {
  name: provider
  icon: string
  label: string
  size: number
}

const providers: providerType[] = [
  {
    name: "google",
    icon: "/images/google-icon.png",
    label: "Continue with Google",
    size: 30
  },
  {
    name: "github",
    icon: "/images/github-icon.png",
    label: "Continue with GitHub",
    size: 30
  },
  {
    name: "facebook",
    icon: "/images/facebook-icon.png",
    label: "Continue with Facebook",
    size: 30
  }
]

const SocialAuthButtons = () => {
    const handleAuthLogin = async (provider: provider) => {
        const supabase = createClient()
        await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        })
    }

  return (
    <div className="flex flex-row justify-center gap-12">
      {providers.map((provider: providerType) => (
        <SocialButton
            key={provider.name} 
            action={() => handleAuthLogin(provider.name)}
            >
            <Image
                src={provider.icon}
                alt={provider.name}
                width={provider.size}
                height={provider.size}
            />
        </SocialButton>
      ))}
    </div>
  )
}

export default SocialAuthButtons

