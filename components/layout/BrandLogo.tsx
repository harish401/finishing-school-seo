"use client";

import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <img 
      src="/logo.svg" 
      alt="Unique Mentors Logo" 
      className={cn("h-9 w-auto object-contain", className)} 
    />
  );
}
