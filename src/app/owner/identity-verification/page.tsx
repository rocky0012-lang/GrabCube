'use client'

import React from 'react'
import { CubeGrabLogo } from '@/components/reusable/cubegrab-logo'

const IdentityVerification = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <CubeGrabLogo />
        <div>
           <h1 className="text-3xl font-bold mb-4">Verify your identity</h1>
           <p className="text-lg mb-6">we need to verify your identity to keep our platform safe and secure</p>
        </div>
    
      
    </main>
  )
}

export default IdentityVerification