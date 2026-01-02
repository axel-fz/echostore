"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("Hero");
  const router = useRouter();

  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    {
      key: "tshirts",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop",
    },
    {
      key: "trousers",
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=1000&fit=crop",
    },
    {
      key: "bags",
      image:
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [categories.length]);

 /*  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % categories.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + categories.length) % categories.length
    ); */

  const handleShopNow = () =>
    router.push("/?category=all#product_grid");

  return (
    <div className="relative w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-black text-indigo-900 dark:text-white min-h-screen flex items-center overflow-hidden transition-colors duration-300">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-900/30 rounded-full blur-xl opacity-70 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 dark:bg-purple-900/30 rounded-full blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 dark:bg-pink-900/30 rounded-full blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8">
            <span className="inline-block text-sm font-semibold uppercase bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 rounded-full">
              {t("badge")}
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none">
              ECHO
              <span className="block text-indigo-700 dark:text-indigo-400 mt-2">
                STORE
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-indigo-700 dark:text-indigo-300 max-w-lg">
              {t("subtitle")}
            </p>

            <button
              onClick={handleShopNow}
              className="group bg-indigo-900 dark:bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 font-semibold flex items-center gap-2 hover:bg-indigo-800 transition"
            >
              {t("shopNow")}
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>

            {/* Stats */}
            <div className="flex gap-8 pt-6 border-t border-indigo-200 dark:border-indigo-800">
              <div>
                <div className="text-4xl font-bold">50+</div>
                <div className="text-sm text-indigo-600 dark:text-indigo-400">
                  {t("stats.products")}
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold">3</div>
                <div className="text-sm text-indigo-600 dark:text-indigo-400">
                  {t("stats.categories")}
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3">
              {categories.map((cat, idx) => (
                <button
                  key={cat.key}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition ${
                    currentSlide === idx
                      ? "bg-indigo-900 dark:bg-indigo-600 text-white"
                      : "bg-indigo-100 dark:bg-indigo-900/30"
                  }`}
                >
                  {t(`categories.${cat.key}.name`)}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative h-[500px] sm:h-[550px] md:h-[600px]">
            {categories.map((cat, idx) => (
              <div
                key={cat.key}
                className={`absolute inset-0 transition-all duration-700 ${
                  idx === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={cat.image}
                  alt={t(`categories.${cat.key}.name`)}
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent rounded-3xl" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-4xl font-bold">
                    {t(`categories.${cat.key}.name`)}
                  </h3>
                  <p className="mt-2 text-white/90">
                    {t(`categories.${cat.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
