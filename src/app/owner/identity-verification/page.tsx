import { CubeGrabLogo } from '@/components/reusable/cubegrab-logo'
import { Input } from "@/components/ui/input"
import { IdCard } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const IdentityVerification = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
        <CubeGrabLogo />
        <div>
           <h1 className="text-3xl font-bold mb-4">Verify your identity</h1>
           <p className="text-lg mb-6">We need to verify your identity to keep our platform safe and secure</p>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-lg text-[#a0a0a0] font-bold">National ID / Passport Number</CardTitle>
            <CardDescription>Enter your national ID or passport number</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full">
              <Input
                id="id-card"
                type="text"
                placeholder="Enter your ID or passport number"
                /* Added pr-10 to prevent text from overlapping with the icon */
                className="w-full p-2 pr-10 border h-10 placeholder:[color:var(--color-text-tertiary)] rounded-md" 
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IdCard className="h-5 w-5 text:[color:var(--color-bg-secondary-base)]" />
              </div>
            </div>
          </CardContent>
        </Card>
    
      
    </main>
  )
}

export default IdentityVerification