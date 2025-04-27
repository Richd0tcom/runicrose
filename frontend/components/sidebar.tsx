"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "gsap"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useCacheData } from "@/hooks/use-cache-data"

export default function Sidebar() {
  const { t } = useTranslation()
  const sidebarRef = useRef(null)
  const { cachedData } = useCacheData("rankingData")

  // Use cached data or fallback to default
  const rankingData = cachedData?.ranking || [
    { name: "プランクト", last: 32000, change: -18.8, changePercent: 30.2, trend: "up" },
    { name: "浜ビル", last: 30000, change: -17.7, changePercent: 28.0, trend: "down" },
    { name: "井上ビル", last: 28800, change: -16.8, changePercent: 27.2, trend: "down" },
    { name: "小笠原ビル", last: 27700, change: -15.6, changePercent: 26.2, trend: "up" },
    { name: "中宮ビル", last: 25500, change: -14.5, changePercent: 25.2, trend: "down" },
    { name: "美竹ビル", last: 25500, change: -10.5, changePercent: 25.2, trend: "down" },
    { name: "春日公園ビル", last: 24400, change: -9.4, changePercent: 24.2, trend: "up" },
    { name: "武蔵高岡", last: 22200, change: -8.2, changePercent: 22.2, trend: "down" },
  ]

  useEffect(() => {
    // Animate sidebar elements
    gsap.from(".sidebar-title", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.3,
    })

    gsap.from(".sidebar-row", {
      opacity: 0,
      x: -30,
      duration: 0.3,
      stagger: 0.05,
      delay: 0.5,
    })

    gsap.from(".sidebar-chart", {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      delay: 0.8,
    })
  }, [])

  return (
    <div ref={sidebarRef} className="h-full overflow-auto p-2">
      {/* Ranking Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 sidebar-title">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#18c7fe]/20 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-[#18c7fe] rounded-sm"></div>
            </div>
            <span className="text-sm">{t("sidebar.ranking")}</span>
          </div>
          <div className="flex text-xs space-x-1">
            <span className="text-[#18c7fe]">D</span>
            <span>/</span>
            <span className="text-[#18c7fe]">W</span>
            <span>/</span>
            <span>M</span>
          </div>
        </div>

        <table className="w-full text-xs">
          <thead className="border-b border-[#18c7fe]/20">
            <tr className="text-gray-400">
              <th className="py-2 text-left">{t("sidebar.projectName")}</th>
              <th className="py-2 text-right">LAST</th>
              <th className="py-2 text-right">CHG</th>
              <th className="py-2 text-right">CHG%</th>
              <th className="py-2 text-right">P/L</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((item, index) => (
              <tr
                key={index}
                className={`border-b ${
                  item.trend === "up" ? "border-[#18c7fe]/30 bg-[#18c7fe]/10" : "border-[#18c7fe]/10"
                } sidebar-row`}
              >
                <td className="py-2 flex items-center gap-1">
                  <span className="text-[#18c7fe]">⚡</span> {item.name}
                </td>
                <td className="py-2 text-right">{item.last.toLocaleString()}</td>
                <td className="py-2 text-right">{item.change.toFixed(2)}</td>
                <td className="py-2 text-right">{item.changePercent.toFixed(2)}%</td>
                <td className="py-2 text-right text-[#06f7a1]">
                  {item.trend === "up" ? (
                    <ChevronUp className="w-3 h-3 inline text-[#06f7a1]" />
                  ) : (
                    <ChevronDown className="w-3 h-3 inline text-[#ff483d]" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trend Analysis */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2 sidebar-title">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#18c7fe]/20 rounded flex items-center justify-center">
              <div className="w-2 h-2 bg-[#18c7fe] rounded-sm"></div>
            </div>
            <span className="text-sm">{t("sidebar.trendAnalysis")}</span>
          </div>
          <div className="flex text-xs space-x-1">
            <span className="text-[#18c7fe]">D</span>
            <span>/</span>
            <span className="text-[#18c7fe]">W</span>
            <span>/</span>
            <span>M</span>
          </div>
        </div>

        <div className="flex justify-between mb-2">
          <div>
            <div className="text-xs text-gray-400">{t("sidebar.parameterA")}</div>
            <div className="text-2xl font-bold">400</div>
            <div className="flex space-x-1 mt-1">
              {Array(10)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-6 bg-[#06f7a1] rounded-sm"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 0.1}s`,
                      animation: "pulse 2s infinite",
                    }}
                  ></div>
                ))}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{t("sidebar.parameterB")}</div>
            <div className="text-2xl font-bold">600</div>
            <div className="w-32 h-4 bg-[#18c7fe]/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#18c7fe] rounded-full"
                style={{
                  width: "75%",
                  animation: "progress 1.5s ease-out",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-[#040a0b] rounded p-2 mt-4 sidebar-chart">
          <div className="h-40 w-full relative">
            {/* Animated chart bars */}
            <div className="absolute bottom-0 w-full">
              {Array(30)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="inline-block w-2 mx-0.5">
                    <div
                      className={`w-full ${i % 3 === 0 ? "bg-[#06f7a1]" : "bg-gray-500"}`}
                      style={{
                        height: `${Math.sin(i / 3) * 20 + 30}px`,
                        opacity: i % 3 === 0 ? 1 : 0.3,
                        animation: `barGrow 1s ease-out ${i * 0.03}s both`,
                      }}
                    ></div>
                    <div
                      className="w-full bg-gray-500"
                      style={{
                        height: `${Math.cos(i / 3) * 20 + 20}px`,
                        opacity: 0.3,
                        animation: `barGrow 1s ease-out ${i * 0.03 + 0.5}s both`,
                      }}
                    ></div>
                  </div>
                ))}
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">{t("sidebar.dataStatistics")}</div>
        </div>
      </div>
    </div>
  )
}
