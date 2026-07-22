'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Camera, IdCard } from "lucide-react"

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
    onImageSelected?: (file: File) => void;
}

const CaptureIdCard = ({ title, description, onImageSelected }: CaptureIdCardProps) => {
  const [ error, setError ] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ preview, setPreview ] = useState<string | null>(null);

  useEffect(() => {
    // Cleanup the object URL when the component unmounts or when a new file is selected
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
    }, [preview]);

    const handleClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      
      if (!file) 
        return;
      
      setError(null); // Clear any previous error

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ];
  
      if (!allowedTypes.includes(file.type)) {
        setError("Invalid file type. Please select a JPEG, PNG, or WEBP image.");
        return;
      }

      const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSizeInBytes) {
        setError("File size exceeds the 5MB limit. Please select a smaller file.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onImageSelected?.(file);
      event.target.value = ''; // Reset the input value to allow re-selection of the same file
    }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };


  return (
    <>
      <div className="flex flex-col items-center w-64">
        <Card 
          className="w-64 cursor-pointer rounded-2xl border-2 border-dashed bg-[var(--color-shadow-primary)] transition-all hover:bg-[var(--color-shadow-primary)]/5 hover:border-[var(--color-accent-gold)]"
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
            <CardHeader>
              <CardTitle className="text-center">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center gap-2">
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt={`${title} preview`}
                    className="h-40 w-full rounded-xl object-cover border"
                  /> 
                  <p className="text-xs text-muted-foreground">
                    Tap to change image
                  </p>
                </>
              ) : (
                <>
                  <IdCard aria-hidden="true" className="size-10 text-[var(--color-accent-gold)]" />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900">
                    <Camera aria-hidden="true" className="size-6 text-white" />
                  </div>
                  <CardDescription className="text-center text-sm">
                    {description}
                  </CardDescription>
                </>)}
            </CardContent>
        </Card>
         {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg, image/png, image/webp"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  )
}

export default CaptureIdCard
