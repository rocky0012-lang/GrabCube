import React from 'react'
import { Camera } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface CaptureIdCardProps {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const CaptureIdCard = ({ title, description, icon: Icon }: CaptureIdCardProps) => {
  return (
    <Card className="w-64 cursor-pointer rounded-2xl border-2 border-dashed bg-[var(--color-shadow-primary)] transition-all hover:bg-[var(--color-shadow-primary)]/5 hover:border-[var(--color-accent-gold)]">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-2">
          <Icon aria-hidden="true" className="size-10 text-[var(--color-accent-gold)]" />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900">
            <Camera aria-hidden="true" className="size-6 text-white" />
          </div>
          <CardDescription className="text-center text-sm">
            {description}
          </CardDescription>
        </CardContent>
    </Card>
  )
}

export default CaptureIdCard
