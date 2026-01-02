'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Locale, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FiGlobe } from 'react-icons/fi';

function ToggleLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locales = routing.locales;
  const currentLocale = useLocale();

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLocale = event.target.value as Locale;
    const queryString = searchParams.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace({ pathname: newUrl }, { locale: selectedLocale });
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Globe Icon */}
      <FiGlobe
        className="
          absolute left-2 top-1/2 -translate-y-1/2
          h-3 w-3
          sm:h-4 sm:w-4
          md:h-5 md:w-5
          text-indigo-700 dark:text-white
          pointer-events-none
          z-10
        "
      />

      {/* Select Dropdown */}
<select
  onChange={handleLocaleChange}
  value={currentLocale}
  className="
    appearance-none
    pl-7 pr-7 py-1.5
    sm:pl-9 sm:pr-9 sm:py-2
    md:pl-10 md:pr-10 md:py-2.5
    text-[13px] sm:text-sm md:text-base
    font-medium
    text-left
    rounded-lg
    border-2 border-indigo-200 dark:border-indigo-800
    bg-white dark:bg-black
    text-indigo-900 dark:text-white
    hover:border-indigo-300 dark:hover:border-indigo-700
    focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600
    focus:border-transparent
    transition-all duration-200
    cursor-pointer
    shadow-sm hover:shadow-md
  "
>

        {locales.map((locale) => (
      <option
  key={locale}
  value={locale}
  className="
    text-left pr-10
    bg-white dark:bg-gray-800
    text-indigo-900 dark:text-indigo-200
    text-[11px] sm:text-sm md:text-base
  "
>
  {locale.toUpperCase()}
</option>

        ))}
      </select>

      {/* Custom Arrow Icon */}
      <svg
        className="
          absolute right-2 top-1/2 -translate-y-1/2
          h-3 w-3
          sm:h-4 sm:w-4
          md:h-5 md:w-5
          text-indigo-700 dark:text-white
          pointer-events-none
        "
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

export function ToggleLocalSuspense() {
  return (
    <Suspense
      fallback={
        <div className="
          flex items-center gap-2
          px-3 py-1.5
          sm:px-4 sm:py-2
          md:px-5 md:py-2.5
          text-[10px] sm:text-sm md:text-base
          font-medium
          rounded-lg
          border-2 border-indigo-200 dark:border-indigo-800
          bg-white dark:bg-gray-800
          text-indigo-700 dark:text-indigo-300
          animate-pulse
        ">
          <FiGlobe className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
          <span>...</span>
        </div>
      }
    >
      <ToggleLocale />
    </Suspense>
  );
}
