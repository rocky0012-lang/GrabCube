'use client'

import React from 'react'
import { Button } from "@/components/ui/button"

interface SocialButtonProps {
  children: React.ReactNode
  action: () => void
}

const SocialButton = ({children, action}: SocialButtonProps) => {
  return (
      <Button onClick={action} variant="outline" className="flex flex-row items-center justify-between p-6 gap-4">
        {children}
      </Button>
  )
}

export default SocialButton
