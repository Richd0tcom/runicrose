"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Lock, CheckCircle, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCacheData } from "@/hooks/use-cache-data"
import Link from "next/link"

export default function VirtualLab() {
  const [labLoading, setLabLoading] = useState(false)
  const { t } = useTranslation()
  const { cachedData } = useCacheData("labData")

  // Use cached data or fallback to default
  const labModules = cachedData?.modules || [
    { id: 1, name: "Network Security Basics", completed: true, locked: false },
    { id: 2, name: "Firewall Configuration", completed: false, locked: false },
    { id: 3, name: "Intrusion Detection Systems", completed: false, locked: true },
    { id: 4, name: "Advanced Threat Protection", completed: false, locked: true },
  ]

  const handleStartLab = () => {
    setLabLoading(true)

    // Simulate loading before navigation
    setTimeout(() => {
      setLabLoading(false)
      // Navigation will happen via the Link component
    }, 500)
  }

  return (
    <div className="bg-[#040a0b] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[#18c7fe]">{t("lab.title")}</div>
        <Link href="/virtual-lab" passHref>
          <Button
            onClick={handleStartLab}
            disabled={labLoading}
            className="bg-[#18c7fe] hover:bg-[#18c7fe]/80 text-black"
          >
            {labLoading ? (
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                {t("lab.loading")}
              </div>
            ) : (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                {t("lab.launch")}
              </>
            )}
          </Button>
        </Link>
      </div>

      <div className="space-y-2">
        {labModules.map((module) => (
          <div
            key={module.id}
            className={`p-3 rounded-md flex justify-between items-center lab-module ${
              module.locked ? "bg-[#18c7fe]/5" : "bg-[#18c7fe]/10"
            }`}
          >
            <div className="flex items-center">
              {module.completed ? (
                <CheckCircle className="w-5 h-5 text-[#06f7a1] mr-2" />
              ) : module.locked ? (
                <Lock className="w-5 h-5 text-gray-500 mr-2" />
              ) : (
                <div className="w-5 h-5 border border-[#18c7fe] rounded-full mr-2"></div>
              )}
              <span className={module.locked ? "text-gray-500" : ""}>{module.name}</span>
            </div>
            <div className="text-xs text-gray-400">
              {module.completed ? t("lab.completed") : module.locked ? t("lab.locked") : t("lab.available")}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-400">{t("lab.description")}</div>
    </div>
  )
}
