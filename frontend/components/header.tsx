"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "gsap"
import { Cloud, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { changeLanguage } from "@/i18n/config"


export default function Header() {
  const [time, setTime] = useState(new Date())
  const [date, setDate] = useState<Date | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    // Animate header elements
    const timeline = gsap.timeline()
    timeline.from(".header-logo", { x: -50, opacity: 0, duration: 0.5 })
    timeline.from(".header-nav", { y: -20, opacity: 0, duration: 0.3, stagger: 0.1 }, "-=0.3")
    timeline.from(".header-info", { x: 50, opacity: 0, duration: 0.5 }, "-=0.5")

    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(()=>{
    setDate(new Date());
  },[])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    const locale = new Intl.Locale("en-NG")
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
  }

  const handleLanguageChange = (lang: any) => {
    changeLanguage(lang)
  }

  return (
    <header className="flex justify-between items-center p-2 border-b border-[#18c7fe]/20 bg-[#00020a]">
      <div className="flex items-center gap-3 header-logo">
        <div className="relative w-10 h-10 md:w-12 md:h-12">
          <div className="absolute inset-0 bg-[#18c7fe] rounded-md opacity-70"></div>
          <div className="absolute inset-1 bg-[#00020a] rounded-sm flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-[#18c7fe] rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-[#18c7fe] rounded-sm"></div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-white">
            SAMRT <span className="text-xs bg-[#18c7fe]/20 px-2 py-0.5 rounded text-[#18c7fe]">Beta</span>
          </h1>
          <p className="text-xs text-gray-400 hidden md:block">{t("header.subtitle")}</p>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#18c7fe]"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4 header-nav">
        <button className="px-4 py-1 bg-[#18c7fe]/10 text-[#18c7fe] rounded">{t("header.home")}</button>
        <button className="px-4 py-1 hover:bg-[#18c7fe]/10 rounded">{t("header.page2")}</button>
        <button className="px-4 py-1 hover:bg-[#18c7fe]/10 rounded">{t("header.page3")}</button>
        <button className="px-4 py-1 hover:bg-[#18c7fe]/10 rounded">{t("header.page4")}</button>
      </div>

      {/* Language selector and info */}
      <div className="hidden md:flex items-center gap-4 header-info">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="border-[#18c7fe]/30 text-[#18c7fe]">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleLanguageChange("en")}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("fr")}>Français</DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleLanguageChange("ar")}>العربية</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2 border border-[#18c7fe]/30 rounded px-2 py-1">
          <div className="w-5 h-5 bg-[#18c7fe]/20 rounded flex items-center justify-center">
            <div className="w-3 h-3 bg-[#18c7fe] rounded-sm"></div>
          </div>
          <div>
            <div className="text-xs text-[#18c7fe]">{t("header.edition")}</div>
            <div className="text-xs text-gray-400">V0.02 08/08</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xl md:text-2xl font-bold">32℃</div>
          <div className="text-xs text-gray-400">PM 2.0</div>
        </div>

        <div className="flex items-center gap-1">
          <Cloud className="w-5 h-5 text-gray-400" />
        </div>

        <div className="text-right">
          <div className="text-xl md:text-2xl font-bold">{formatTime(time)}</div>
          <div className="text-xs text-gray-400">{date ? formatDate(time) : "loading..."}</div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#00020a] p-4 md:hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#18c7fe]">{t("header.menu")}</h2>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-[#18c7fe]">
              <X />
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            <button className="px-4 py-2 bg-[#18c7fe]/10 text-[#18c7fe] rounded text-left">{t("header.home")}</button>
            <button className="px-4 py-2 hover:bg-[#18c7fe]/10 rounded text-left">{t("header.page2")}</button>
            <button className="px-4 py-2 hover:bg-[#18c7fe]/10 rounded text-left">{t("header.page3")}</button>
            <button className="px-4 py-2 hover:bg-[#18c7fe]/10 rounded text-left">{t("header.page4")}</button>
          </div>

          <div className="mt-6 border-t border-[#18c7fe]/20 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[#18c7fe]">{t("header.language")}</div>
              <div className="flex space-x-2">
                <button
                  className="px-2 py-1 rounded border border-[#18c7fe]/30 text-sm"
                  onClick={() => handleLanguageChange("en")}
                >
                  EN
                </button>
                <button
                  className="px-2 py-1 rounded border border-[#18c7fe]/30 text-sm"
                  onClick={() => handleLanguageChange("fr")}
                >
                  FR
                </button>
                <button
                  className="px-2 py-1 rounded border border-[#18c7fe]/30 text-sm"
                  onClick={() => handleLanguageChange("ar")}
                >
                  AR
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">{formatTime(time)}</div>
              <div className="text-gray-400">{formatDate(time)}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
