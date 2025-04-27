"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import Chart from "chart.js/auto"
import { gsap } from "gsap"
import { useCacheData } from "@/hooks/use-cache-data"

export default function ProgressStats() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const { t } = useTranslation()
  const { cachedData } = useCacheData("progressData")

  const [date, setDate] = useState<Date | null>(null)

  // Use cached data or fallback to default
  const progressData = cachedData?.progress || {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: t("progress.completion"),
        data: [65, 78, 52, 91, 85, 79, 92],
        borderColor: "#18c7fe",
        backgroundColor: "rgba(24, 199, 254, 0.2)",
      },
      {
        label: t("progress.engagement"),
        data: [42, 58, 65, 70, 75, 85, 88],
        borderColor: "#06f7a1",
        backgroundColor: "rgba(6, 247, 161, 0.2)",
      },
    ],
  }

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create chart
    const ctx = chartRef.current.getContext("2d")
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: progressData.labels,
        datasets: progressData.datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000,
          easing: "easeOutQuart",
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: "rgba(24, 199, 254, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          x: {
            grid: {
              color: "rgba(24, 199, 254, 0.1)",
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 0.7)",
            },
          },
          tooltip: {
            backgroundColor: "rgba(0, 2, 10, 0.8)",
            borderColor: "#18c7fe",
            borderWidth: 1,
            titleColor: "#18c7fe",
            bodyColor: "#ffffff",
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.parsed.y}%`,
            },
          },
        },
      },
    })

    // Animate chart container
    gsap.from(".chart-container", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power2.out",
    })

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  // Add a separate effect to update chart when data or language changes
  useEffect(() => {
    if (!chartInstance.current || !progressData) return

    // Update chart data
    chartInstance.current.data.labels = progressData.labels
    chartInstance.current.data.datasets = progressData.datasets
    chartInstance.current.update()
  }, [progressData, t])

  useEffect(()=>{
    setDate(new Date());
  },[])

  return (
    <div className="bg-[#040a0b] rounded-lg p-4 chart-container">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[#18c7fe]">{t("progress.title")}</div>
        <div className="text-xs text-gray-400">
          {t("progress.lastUpdated")}: {date ? new Date().toLocaleDateString(): "loading..."}
        </div>
      </div>

      <div className="h-[300px]">
        <canvas ref={chartRef}></canvas>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <div className="text-xs text-gray-400">{t("progress.completion")}</div>
          <div className="text-xl font-bold">92%</div>
          <div className="w-full h-2 bg-[#18c7fe]/20 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-[#18c7fe] rounded-full"
              style={{ width: "92%", animation: "progress 1.5s ease-out" }}
            ></div>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-400">{t("progress.engagement")}</div>
          <div className="text-xl font-bold">88%</div>
          <div className="w-full h-2 bg-[#06f7a1]/20 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-[#06f7a1] rounded-full"
              style={{ width: "88%", animation: "progress 1.5s ease-out" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
