'use client'

import { useState } from "react"
import { CubeGrabLogo } from '@/components/reusable/cubegrab-logo'
import { Input } from "@/components/ui/input"
import { IdCard } from 'lucide-react';
import CaptureIdCard from "@/components/reusable/capture-id-card"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LiveSelfieCard from "@/components/reusable/live-selfie-card";

const IdentityVerification = () => {
  const [ frontId, setFrontId ] = useState<File | null>(null);
  const [ backId, setBackId ] = useState<File | null>(null);
  return (
    <main className=" flex flex-col items-center justify-center py-6 px-2">
        <CubeGrabLogo 
          width={150}
          height={150}
        />
        <div className="flex flex-col items-start justify-center px-2">
           <h1 className="text-2xl font-bold">Verify your identity</h1>
           <p className=" mb-2">We need to verify your identity to keep our platform safe and secure</p>
        </div>
        <Card className="w-full max-w-md mt-2">
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
                <IdCard className="h-5 w-5 text-fg-tertiary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col items-start justify-center py-6 px-2">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-2xl font-bold pt-2.5">ID Document Camera Upload</h2>
            <p className=" mb-4">Capture clear images of the front and back of your valid ID</p>
          </div>
          <div className="flex flex-col gap-6 w-full md:flex-row items-center justify-center">
          <CaptureIdCard 
            title="Front of ID" 
            description="Tap to capture or upload"
            onImageSelected={(file) => setFrontId(file)} 
          />
          <CaptureIdCard 
            title="Back of ID" 
            description="Tap to capture or upload" 
            onImageSelected={(file) => setBackId(file)}
          />
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Front: {frontId?.name ?? "Not selected"}</p>
            <p>Back: {backId?.name ?? "Not selected"}</p>
          </div>
        </div>
        <LiveSelfieCard />
    </main>
  )
}

export default IdentityVerification