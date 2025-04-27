"use client"

import { useState, useEffect } from "react"
import { openDB } from "idb"

// Define the database name and version
const DB_NAME = "cyberdashboard_db"
const DB_VERSION = 1

// Initialize the IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // Create object stores for different data types
      if (!db.objectStoreNames.contains("dashboard_data")) {
        db.createObjectStore("dashboard_data")
      }
    },
  })
}

export function useCacheData(key: string) {
  const [cachedData, setCachedData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCachedData = async () => {
      try {
        const db = await initDB()
        const data = await db.get("dashboard_data", key)

        if (data) {
          setCachedData(data)

          // Check if data is stale (older than 1 hour)
          const now = new Date().getTime()
          if (data.timestamp && now - data.timestamp > 3600000) {
            console.log("Cached data is stale, will refresh")
          }
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading cached data:", error)
        setIsLoading(false)
      }
    }

    loadCachedData()
  }, [key])

  const cacheData = async (data: any) => {
    try {
      // Don't update state if the data is the same
      if (cachedData && JSON.stringify(cachedData) === JSON.stringify(data)) {
        return true
      }

      const db = await initDB()

      // Add timestamp to track data freshness
      const dataWithTimestamp = {
        ...data,
        timestamp: new Date().getTime(),
      }

      await db.put("dashboard_data", dataWithTimestamp, key)

      // Update state with the new data
      setCachedData(dataWithTimestamp)

      return true
    } catch (error) {
      console.error("Error caching data:", error)
      return false
    }
  }

  const clearCache = async () => {
    try {
      const db = await initDB()
      await db.delete("dashboard_data", key)
      setCachedData(null)
      return true
    } catch (error) {
      console.error("Error clearing cache:", error)
      return false
    }
  }

  return { cachedData, cacheData, clearCache, isLoading }
}
