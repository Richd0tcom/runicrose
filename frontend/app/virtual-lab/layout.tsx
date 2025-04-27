import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Virtual Lab - SAMRT",
  description: "Interactive virtual lab environment for security training",
}

export default function VirtualLabLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
