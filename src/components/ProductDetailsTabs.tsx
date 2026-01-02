'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface ProductDetailsTabsProps {
  description: string;
  features?: string[];
}

export default function ProductDetailsTabs({
  description,
  features = [],
}: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<
    'description' | 'features' | 'return'
  >('description');

  const t = useTranslations('productTabs');

  const tabs = [
    { id: 'description', label: t('tabs.description') },
    { id: 'features', label: t('tabs.features') },
    { id: 'return', label: t('tabs.returns') },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      {/* Tabs header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 text-sm font-medium transition-colors
                ${
                  activeTab === tab.id
                    ? `
                      border-gray-900 text-gray-900
                      dark:border-white dark:text-white
                    `
                    : `
                      border-transparent
                      text-gray-500 dark:text-gray-400
                      hover:text-gray-700 dark:hover:text-gray-200
                      hover:border-gray-300 dark:hover:border-gray-700
                    `
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="mt-8">
        {/* Description */}
        {activeTab === 'description' && (
          <div className="prose max-w-none dark:prose-invert">
            <p className="leading-7 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
        )}

        {/* Features */}
        {activeTab === 'features' && (
          <div>
            {(features.length > 0 ? features : t.raw('features')).map(
              (feature: string, index: number) => (
                <div key={index} className="flex items-start mb-3">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                </div>
              )
            )}
          </div>
        )}

        {/* Returns */}
        {activeTab === 'return' && (
          <div>
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              {t('returns.title')}
            </h3>
            <ul className="space-y-2">
              {t.raw('returns.items').map((item: string, i: number) => (
                <li key={i} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-gray-600 mr-3 mt-0.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
