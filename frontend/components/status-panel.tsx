"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { gsap } from "gsap"
import { ArrowUpRight } from "lucide-react"

export default function StatusPanel() {
  const panelRef = useRef(null)
  const { t } = useTranslation()

  useEffect(() => {
    // Animate panel elements
    const timeline = gsap.timeline({ delay: 1 })

    timeline.from(".status-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power2.out",
    })

    timeline.from(
      ".status-chart",
      {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.3",
    )

    // Pulse animation for indicators
    gsap.to(".status-indicator", {
      opacity: 0.5,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.3,
    })
  }, [])

  return (
    <div ref={panelRef} className="border-t border-[#18c7fe]/20 bg-[#00020a]/80 p-2 md:p-4">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-4 status-item">
          <div>
            <div className="text-xs text-gray-400">{t("status.gpuPrice")}</div>
            <div className="text-2xl md:text-4xl font-bold text-[#18c7fe]">NYSE</div>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="text-gray-400">REG</div>
            <div className="text-right">$487.84/1.91%</div>
            <div className="text-gray-400">OPEN</div>
            <div className="text-right">$487.84/1.91%</div>
            <div className="text-gray-400">VOLUME</div>
            <div className="text-right">82.03M</div>
          </div>
        </div>

        <div className="status-item">
          <div className="text-gray-400 text-xs">{t("status.corePrice")}</div>
          <div className="text-2xl md:text-4xl font-bold">EBBA</div>
          <div className="text-4xl font-bold text-center">0.06</div>
        </div>

        <div className="flex gap-4 status-item">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#18c7fe] flex items-center justify-center relative status-indicator">
              <div className="absolute inset-1 rounded-full border border-[#18c7fe]/30"></div>
              <div className="text-xs">X-T90</div>
            </div>
            <div className="text-xs mt-1">{t("status.highPerf")}</div>
            <div className="text-xs">AMD 500</div>
          </div>
          <div className="hidden md:flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-[#ff9900] flex items-center justify-center relative status-indicator">
              <div className="absolute inset-1 rounded-full border border-[#ff9900]/30"></div>
              <div className="text-xs">X-T70</div>
            </div>
            <div className="text-xs mt-1">{t("status.highPerf")}</div>
            <div className="text-xs">XGM 500</div>
          </div>
        </div>

        <div className="flex gap-4 status-item">
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-400">7H</div>
            <div className="text-2xl md:text-4xl font-bold">400</div>
            <div className="text-xs text-gray-400">{t("status.bestStock")}</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xs text-gray-400">M1</div>
            <div className="text-2xl md:text-4xl font-bold text-[#18c7fe]">05</div>
            <div className="flex items-center text-[#18c7fe]">
              <span className="text-lg font-bold">M06/02</span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 h-10 bg-[#040a0b] rounded relative status-chart">
        <div className="absolute inset-0">
          <div className="h-full w-full bg-[#18c7fe]/10 overflow-hidden">
            <div className="h-full w-3/4 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-4">
                  <svg viewBox="0 0 500 100" className="w-full h-full">
                    <path
                      d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,30 T250,60 T300,40 T350,50 T400,20 T450,50 T500,50"
                      fill="none"
                      stroke="#18c7fe"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
