// Simulated API service for dashboard data

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Fetch dashboard data
export async function fetchDashboardData() {
  // Simulate API call delay
  await delay(800)

  return {
    timestamp: new Date().getTime(),
    ranking: [
      { name: "プランクト", last: 32000, change: -18.8, changePercent: 30.2, trend: "up" },
      { name: "浜ビル", last: 30000, change: -17.7, changePercent: 28.0, trend: "down" },
      { name: "井上ビル", last: 28800, change: -16.8, changePercent: 27.2, trend: "down" },
      { name: "小笠原ビル", last: 27700, change: -15.6, changePercent: 26.2, trend: "up" },
      { name: "中宮ビル", last: 25500, change: -14.5, changePercent: 25.2, trend: "down" },
      { name: "美竹ビル", last: 25500, change: -10.5, changePercent: 25.2, trend: "down" },
      { name: "春日公園ビル", last: 24400, change: -9.4, changePercent: 24.2, trend: "up" },
      { name: "武蔵高岡", last: 22200, change: -8.2, changePercent: 22.2, trend: "down" },
    ],
    progress: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      datasets: [
        {
          label: "Completion Rate",
          data: [65, 78, 52, 91, 85, 79, 92],
          borderColor: "#18c7fe",
          backgroundColor: "rgba(24, 199, 254, 0.2)",
        },
        {
          label: "Engagement Rate",
          data: [42, 58, 65, 70, 75, 85, 88],
          borderColor: "#06f7a1",
          backgroundColor: "rgba(6, 247, 161, 0.2)",
        },
      ],
    },
    profile: {
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
    },
    modules: [
      { id: 1, name: "Network Security Basics", completed: true, locked: false },
      { id: 2, name: "Firewall Configuration", completed: false, locked: false },
      { id: 3, name: "Intrusion Detection Systems", completed: false, locked: true },
      { id: 4, name: "Advanced Threat Protection", completed: false, locked: true },
    ],
  }
}

// Fetch specific data types
export async function fetchRankingData() {
  await delay(500)
  return fetchDashboardData().then((data) => ({ ranking: data.ranking }))
}

export async function fetchProgressData() {
  await delay(600)
  return fetchDashboardData().then((data) => ({ progress: data.progress }))
}

export async function fetchProfileData() {
  await delay(400)
  return fetchDashboardData().then((data) => ({ profile: data.profile }))
}

export async function fetchLabData() {
  await delay(300)
  return fetchDashboardData().then((data) => ({ modules: data.modules }))
}
