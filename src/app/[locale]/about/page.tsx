'use client';

import React from "react";
import { useTranslations } from "next-intl";
import { User, Target, Coffee } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("aboutPage");

  return (
    <div className="min-h-screen bg-white dark:bg-black text-indigo-900 dark:text-white transition-colors">
      {/* Hero Section */}
      <div className="relative mt-8 mx-2 lg:mx-45 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-black py-24 sm:py-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-4 sm:left-10 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-300 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-4 sm:right-10 w-56 h-56 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            {t("heroTitle")}
          </h1>
          <p className="text-lg sm:text-xl text-indigo-700 dark:text-indigo-300 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="mx-2 mb-8 mt-40 lg:mx-45 px-4 sm:px-6 lg:px-12 py-16 sm:py-24 bg-indigo-50 dark:bg-indigo-900/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
            <Target className="mx-auto h-12 w-12 text-indigo-700 dark:text-indigo-400" />
            <h3 className="text-xl font-bold">{t("missionTitle")}</h3>
            <p className="text-indigo-700 dark:text-indigo-300">{t("missionText")}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
            <Coffee className="mx-auto h-12 w-12 text-indigo-700 dark:text-indigo-400" />
            <h3 className="text-xl font-bold">{t("visionTitle")}</h3>
            <p className="text-indigo-700 dark:text-indigo-300">{t("visionText")}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg space-y-4">
            <User className="mx-auto h-12 w-12 text-indigo-700 dark:text-indigo-400" />
            <h3 className="text-xl font-bold">{t("valuesTitle")}</h3>
            <p className="text-indigo-700 dark:text-indigo-300">{t("valuesText")}</p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="w-full px-4 sm:px-6 lg:px-12 py-16 sm:py-24">
        <div className="max-w-lg mx-auto grid dark:ring dark:ring-indigo-900 lg:flex items-center">
          <div className="relative flex flex-col items-center justify-center space-y-6 lg:pr-60 px-5 py-5 rounded-2xl shadow-xl">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">{t("whoWeAreTitle")}</h2>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed text-lg">{t("whoWeAreText1")}</p>
              <p className="text-indigo-700 dark:text-indigo-300 leading-relaxed text-lg">{t("whoWeAreText2")}</p>
            </div>
            <div className="w-full lg:dark:ring lg:dark:ring-indigo-900 lg:absolute lg:top-20 lg:right-[-100] max-w-[300px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/Axel.png"
                alt={t("whoWeAreImageAlt")}
                className="w-full h-full block dark:hidden object-cover"
              />
              <img
                src="/Axel_dark.png"
                alt={t("whoWeAreImageAlt")}
                className="w-full h-full hidden dark:block object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
