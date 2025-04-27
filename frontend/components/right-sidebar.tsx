"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "gsap"
import { Maximize2 } from "lucide-react"
import { useCacheData } from "@/hooks/use-cache-data"

export default function RightSidebar() {
  const sidebarRef = useRef(null)
  const { t } = useTranslation()
  const { cachedData } = useCacheData("userProfileData")

  // Use cached data or fallback to default
  const profileData = cachedData?.profile || {
    id: "ID-1890F2X",
    name: "JACK CUI",
    position: "82.03M",
    progress: "-2.05%",
    contact: "40.000",
    locations: [
      "成田空港T1・到着階・A0化粧室",
      "成田空港T1・到着階・B0化粧室",
      "成田空港地下下鉄入口・地下鉄1号",
      "成田空港地下下鉄入口・地下鉄2号",
      "地下鉄3号・日暮里駅B出口",
      "地下鉄原宿駅エントランス",
    ],
  }

  useEffect(() => {
    // Animate sidebar elements
    gsap.from(".profile-header", {
      opacity: 0,
      y: -20,
      duration: 0.5,
    })

    gsap.from(".profile-details", {
      opacity: 0,
      x: 20,
      duration: 0.5,
      delay: 0.2,
    })

    gsap.from(".location-item", {
      opacity: 0,
      y: 10,
      stagger: 0.05,
      duration: 0.3,
      delay: 0.4,
    })

    gsap.from(".trend-section", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 0.6,
    })
  }, [])

  return (
    <div ref={sidebarRef} className="h-full overflow-auto p-2">
      <div className="mb-4 profile-header">
        <div className="text-3xl font-bold text-[#18c7fe]">{profileData.id}</div>

        <div className="flex mt-2 profile-details">
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <div className="text-gray-400">{t("profile.name")}</div>
              <div className="font-bold">{profileData.name}</div>
              <div className="text-gray-400">{t("profile.position")}</div>
              <div className="font-bold">{profileData.position}</div>
              <div className="text-gray-400">{t("profile.progress")}</div>
              <div className="font-bold">{profileData.progress}</div>
              <div className="text-gray-400">{t("profile.contact")}</div>
              <div className="font-bold">{profileData.contact}</div>
            </div>
          </div>
          <div className="w-24 h-24 bg-[#040a0b] rounded"></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-[#18c7fe]/10 rounded p-2 text-xs">
          <div>{t("profile.actionTracking")}</div>
        </div>
        <div className="bg-[#040a0b] rounded p-2 text-xs">
          <div>{t("profile.duty")}</div>
        </div>
      </div>

      <div className="space-y-1 mb-4">
        {profileData.locations.map((location, i) => (
          <div
            key={i}
            className="flex justify-between items-center text-xs p-1 border-b border-[#18c7fe]/10 location-item"
          >
            <div>{location}</div>
            <div>18:00 はみ込み勤務</div>
          </div>
        ))}
      </div>

      {/* Movement Trend */}
      <div className="mb-4 trend-section">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#18c7fe]/20 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-[#18c7fe] rounded-sm"></div>
            </div>
            <span className="text-sm">{t("profile.movementTrend")}</span>
          </div>
          <div className="flex text-xs space-x-1">
            <span className="text-[#18c7fe]">D</span>
            <span>/</span>
            <span className="text-[#18c7fe]">W</span>
            <span>/</span>
            <span>M</span>
          </div>
        </div>

        <div className="flex space-x-2 text-xs mb-2">
          <div className="bg-[#18c7fe]/10 rounded p-1">{t("profile.dataStats")} 01</div>
          <div className="bg-[#18c7fe]/10 rounded p-1">{t("profile.dataStats")} 02</div>
          <div className="bg-[#18c7fe]/10 rounded p-1">{t("profile.illustration")}</div>
        </div>

        <div className="bg-[#040a0b] rounded p-2 h-32 relative">
          <div className="absolute right-2 top-2 text-xs text-gray-400">
            <div>300</div>
            <div>280</div>
            <div>260</div>
            <div>240</div>
            <div>220</div>
            <div>200</div>
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-16">
              <svg viewBox="0 0 500 100" className="w-full h-full">
                <path
                  d="M0,80 Q25,70 50,60 T100,50 T150,55 T200,45 T250,40 T300,30 T350,35 T400,25 T450,20 T500,15"
                  fill="none"
                  stroke="#18c7fe"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-400 flex justify-between mt-1">
          <div>{t("profile.dataDelivery")}</div>
          <div>06/08/2021 土曜日</div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <div className="bg-[#040a0b] rounded p-2 flex items-center justify-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border border-[#18c7fe]/30 rounded-sm"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#18c7fe]"></div>
            </div>
          </div>
        </div>
        <div className="bg-[#040a0b] rounded p-2 flex items-center justify-center">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Maximize2 className="w-12 h-12 text-[#18c7fe]/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
