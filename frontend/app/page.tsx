"use client"

import { useEffect, useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "gsap"
import dynamic from "next/dynamic"
import { Loader } from "lucide-react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import NetworkMap from "@/components/network-map"
import ProgressStats from "@/components/progress-stats"
import VirtualLab from "@/components/virtual-lab"
import StatusPanel from "@/components/status-panel"
import { fetchDashboardData } from "@/services/api"
import { useCacheData } from "@/hooks/use-cache-data"
import { registerServiceWorker } from "@/lib/service-worker"

// Dynamically import the RightSidebar to reduce initial load time
const RightSidebar = dynamic(() => import("@/components/right-sidebar"), {
  loading: () => (
    <div className="w-[350px] border-l border-[#18c7fe]/20 p-4 flex items-center justify-center">
      <Loader className="w-8 h-8 text-[#18c7fe] animate-spin" />
    </div>
  ),
  ssr: false,
})

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef(null)
  const dataFetchedRef = useRef(false)
  const { t } = useTranslation()

  // Use our custom hook for caching data
  const { cachedData, cacheData } = useCacheData("dashboardData")

  useEffect(() => {
    // Register service worker for PWA support
    registerServiceWorker()

    // Animation for the main container
    gsap.from(mainRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    })

    // Load data only once
    if (!dataFetchedRef.current) {
      dataFetchedRef.current = true

      // Load data from cache first if available
      if (cachedData) {
        setDashboardData(cachedData)
        setIsLoading(false)
      }

      // Then fetch fresh data
      const loadData = async () => {
        try {
          const data = await fetchDashboardData()
          setDashboardData(data)
          setIsLoading(false)

          // Cache the fresh data
          cacheData(data)
        } catch (error) {
          console.error("Failed to fetch dashboard data:", error)
          // If we have cached data, we can still show that
          if (!cachedData) {
            setIsLoading(false)
          }
        }
      }

      loadData()
    }
  }, []) // Empty dependency array to run only once

  return (
    <div ref={mainRef} className="min-h-screen bg-[#00020a] text-white font-mono overflow-hidden flex flex-col">
      <Header />

      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Sidebar - Hidden on mobile, shown on tablet and up */}
        <div className="hidden md:block md:w-[280px] lg:w-[350px] border-r border-[#18c7fe]/20">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-2 md:p-4 relative">
            <h2 className="text-xl text-[#18c7fe] mb-4">{t("dashboard.networkMap")}</h2>
            <NetworkMap />

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl text-[#18c7fe] mb-4">{t("dashboard.progressStats")}</h2>
                <ProgressStats />
              </div>
              <div>
                <h2 className="text-xl text-[#18c7fe] mb-4">{t("dashboard.virtualLab")}</h2>
                <VirtualLab />
              </div>
            </div>
          </div>

          <StatusPanel />
        </div>

        {/* Right Sidebar - Hidden on mobile and tablet, shown on desktop */}
        <div className="hidden lg:block lg:w-[350px] border-l border-[#18c7fe]/20">
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
