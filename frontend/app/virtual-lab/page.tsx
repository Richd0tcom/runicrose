"use client"

import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "gsap"
import { ArrowLeft, Maximize2, Minimize2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function VirtualLabPage() {
  const { t } = useTranslation()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentModule, setCurrentModule] = useState("Network Security Basics")
  const containerRef = useRef(null)
  const iframeRef = useRef(null)

  useEffect(() => {
    // Animation for the container
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.out",
    })

    // Simulate iframe loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const refreshIframe = () => {
    setIsLoading(true)
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src
    }
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-[#00020a] text-white font-mono p-4 md:p-8" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/" passHref>
              <Button variant="ghost" size="icon" className="mr-4 text-[#18c7fe]">
                <ArrowLeft />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-[#18c7fe]">{t("Nodejs Virtual Lab")}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={refreshIframe}
              className="border-[#18c7fe]/30 text-[#18c7fe]"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFullscreen}
              className="border-[#18c7fe]/30 text-[#18c7fe]"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">{currentModule}</h2>
          <div className="text-sm text-gray-400 mb-4">{t("lab.securityNotice")}</div>
        </div>

        <div
          className="relative bg-black rounded-lg border border-[#18c7fe]/30 overflow-hidden"
          style={{ height: "calc(100vh - 200px)" }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#00020a]/80 z-10">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-[#18c7fe] border-t-transparent rounded-full animate-spin mb-4"></div>
                <div className="text-[#18c7fe]">{t("lab.loadingEnvironment")}</div>
              </div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src="http://localhost:7321/terminal.html" // Replace with your actual iframe URL
            className="w-full h-full"
            title="Virtual Lab Environment"
            sandbox="allow-scripts allow-same-origin allow-forms"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p>{t("lab.instructions")}</p>
        </div>
      </div>
    </div>
  )
}
