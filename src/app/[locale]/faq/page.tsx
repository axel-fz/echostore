'use client';
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, CreditCard, HelpCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function FAQPage() {
  const t = useTranslations("faqPage");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      title: t("paymentSecurity.title"),
      icon: CreditCard,
      questions: [
        {
          question: t("paymentSecurity.questions.q1.question"),
          answer: t("paymentSecurity.questions.q1.answer"),
        },
        {
          question: t("paymentSecurity.questions.q2.question"),
          answer: t("paymentSecurity.questions.q2.answer"),
        },
      ],
    },
    {
      title: t("accountSupport.title"),
      icon: HelpCircle,
      questions: [
        {
          question: t("accountSupport.questions.q1.question"),
          answer: t("accountSupport.questions.q1.answer"),
        },
        {
          question: t("accountSupport.questions.q2.question"),
          answer: t("accountSupport.questions.q2.answer"),
        },
      ],
    },
  ];

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const index = categoryIndex * 100 + questionIndex;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative mx-2 lg:mx-45 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-black py-16 sm:py-20 my-10">
        {/* blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-4 sm:left-10 w-56 h-56 sm:w-72 sm:h-72 bg-indigo-300 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-4 sm:right-10 w-56 h-56 sm:w-72 sm:h-72 bg-purple-300 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        {/* hero content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-900 dark:text-white mb-4 sm:mb-6">
            {t("heroTitle")}
          </h1>
          <p className="text-lg sm:text-xl text-indigo-700 dark:text-indigo-300 mb-6 sm:mb-8">
            {t("heroSubtitle")}
          </p>
          <Link href={"/contact"}>
            <button className="group mx-auto bg-indigo-900 dark:bg-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:bg-indigo-800 dark:hover:bg-indigo-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              {t("contactButton")}
            </button>
          </Link>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
          {faqCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div key={categoryIndex} className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-900 dark:text-indigo-400" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-indigo-900 dark:text-white">
                    {category.title}
                  </h2>
                </div>

                {/* Questions */}
                <div className="space-y-3">
                  {category.questions.map((item, questionIndex) => {
                    const index = categoryIndex * 100 + questionIndex;
                    const isOpen = openIndex === index;

                    return (
                      <div
                        key={questionIndex}
                        className="border-2 border-indigo-100 dark:border-indigo-900/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md bg-white dark:bg-gray-800"
                      >
                        <button
                          onClick={() =>
                            toggleQuestion(categoryIndex, questionIndex)
                          }
                          className="w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left transition-colors duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                        >
                          <span className="text-base sm:text-lg font-semibold text-indigo-900 dark:text-white pr-2 sm:pr-4">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-indigo-600 dark:text-indigo-400 transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Answer */}
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-4 sm:px-6 pb-4 pt-2">
                            <p className="text-sm sm:text-base text-indigo-700 dark:text-indigo-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
