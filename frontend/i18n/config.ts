import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translations
import enTranslations from "./locales/en.json"
import frTranslations from "./locales/fr.json"
import arTranslations from "./locales/ar.json"

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      fr: {
        translation: frTranslations,
      },
      ar: {
        translation: arTranslations,
      },
    },
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  })

// Function to change language
export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng)

  // Store language preference
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng)

    // Handle RTL for Arabic
    if (lng === "ar") {
      document.documentElement.dir = "rtl"
      document.documentElement.lang = "ar"
    } else {
      document.documentElement.dir = "ltr"
      document.documentElement.lang = lng
    }
  }
}

export default i18n
