import React from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { ArrowRight } from 'lucide-react'


interface RoleSelectionCardProps {
    title: string;
    description: string;
    href: string;
    buttonText: string;
    icon: React.ComponentType<{ className?: string }>;
}


const RoleSelectionCard = ({ title, description, href, buttonText, icon: Icon }: RoleSelectionCardProps) => {
  return (
        <Card className="mx-auto rounded-2xl p-2 w-3/4 hover:-translate-y-1 hover:border-[var(--color-accent-gold)]">
          <CardHeader>
            <Icon className="size-6 text-[var(--color-accent-gold)]" />
            <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button size="sm" className="w-full h-8 text-xl bg-[var(--color-accent-gold-dark)] hover:bg-[var(--color-accent-gold)]" asChild>
              <Link href={href}>
                {buttonText} <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
  )
}

export default RoleSelectionCard


