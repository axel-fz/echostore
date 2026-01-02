"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-gray-200 bg-white dark:bg-black dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-900 dark:text-white">
              {t("brand.title")}
            </h3>
            <p className="mt-4 text-sm leading-6 text-indigo-900 dark:text-gray-300">
              {t("brand.description")}
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-900 dark:text-white">
              {t("shop.title")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/" className="footer-link">
                  {t("shop.allProducts")}
                </Link>
              </li>
              <li>
                <Link href="/?category=shirts#product_grid" className="footer-link">
                  {t("shop.shirts")}
                </Link>
              </li>
              <li>
                <Link href="/?category=trousers#product_grid" className="footer-link">
                  {t("shop.trousers")}
                </Link>
              </li>
              <li>
                <Link href="/?category=bags#product_grid" className="footer-link">
                  {t("shop.bags")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-900 dark:text-white">
              {t("company.title")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="footer-link">
                  {t("company.about")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link">
                  {t("company.faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-indigo-900 dark:text-white">
              {t("contact.title")}
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-indigo-900 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                {t("contact.email")}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-600" />
                {t("contact.phone")}
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                {t("contact.location")}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-center text-sm text-indigo-900 dark:text-gray-400">
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
