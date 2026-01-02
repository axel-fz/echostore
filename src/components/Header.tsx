"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { useCart } from "@/contexts/CartContext";
import CartSidebar from "./CartSidebar";
import { ModeToggle } from "./ModeToggle";
import { useTranslations } from "next-intl";
import { ToggleLocalSuspense } from "./ToggleLocale";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
export interface NavItem {
  href: string;
  label: string;
}

export interface HeaderProps {
  brand?: ReactNode;
  brandHref?: string;
  showCart?: boolean;
}

export default function Header({
  brand = "ECHO STORE",
  brandHref = "/",
  showCart = true,
}: HeaderProps) {
  const t = useTranslations("Header");

  const navItems: NavItem[] = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
    { href: "/faq", label: t("faq") },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartCount = showCart ? getTotalItems() : 0;

  return (
    <>
      <header
        className="
        sticky top-0 z-50 w-full border-b
        border-indigo-100 dark:border-indigo-900/50
        bg-white/95 dark:bg-black 
        backdrop-blur-md
        shadow-sm dark:shadow-indigo-900/20
        transition-colors duration-300
      "
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            href={brandHref}
            className="
              text-lg sm:text-xl font-bold 
              text-indigo-900 dark:text-white
              hover:text-indigo-700 dark:hover:text-indigo-300
              transition-colors duration-200
            "
          >
            {brand}
          </Link>

          {/* Desktop Nav ONLY */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  relative text-sm font-medium
                  text-indigo-900  dark:text-white
                  hover:text-indigo-900 dark:hover:text-white
                  transition-colors duration-200
                  after:absolute after:bottom-0 after:left-0 after:h-0.5 
                  after:w-0 after:bg-indigo-900 dark:after:bg-indigo-400 dark:backdrop-blur-sm
                  hover:after:w-full after:transition-all after:duration-300
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart */}
            {showCart && (
              <SignedIn>
              <button
                onClick={() => setCartOpen(true)}
                aria-label={t("cart")}
                className="
                  relative p-2 rounded-full
                  text-indigo-700 dark:text-indigo-300
                  hover:bg-indigo-100 dark:hover:bg-indigo-900/30
                  transition-all duration-200
                  hover:scale-110
                "
              >
                    <FiShoppingCart className="h-5 w-5 dark:text-white sm:h-6 sm:w-6" />

                {cartCount > 0 && (
                  <span
                  className="
                  absolute -top-1 -right-1 flex h-5 w-5
                  items-center justify-center rounded-full
                  bg-indigo-900 dark:bg-indigo-600
                  text-xs font-bold
                  text-white
                  shadow-lg shadow-indigo-900/50
                  animate-pulse
                  "
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </button>
                </SignedIn>
            )}

            <div
              className="
              p-0.5 rounded-lg
              hidden lg:block
              hover:bg-indigo-50 dark:hover:bg-indigo-900/20
              transition-colors duration-200
            "
            >
              <ModeToggle />
            </div>

            <div
              className="
              p-0.5 rounded-lg
              hover:bg-indigo-50 dark:hover:bg-indigo-900/20
              transition-colors duration-200
            "
            >
              <ToggleLocalSuspense />
            </div>

                <SignedOut>
                  <SignUpButton>
                    <button className="ml-2  bg-[#6c47ff] text-white rounded-xl font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                      Shop Now
                    </button>
                  </SignUpButton>
                </SignedOut>


{/* promt = make this clickable on mobile and all screens */}
                <SignedIn>
                  <UserButton />
                </SignedIn>
            {/* Hamburger → Mobile + Tablet */}
            <button
              className="
                lg:hidden p-2 rounded-lg
                text-indigo-900 dark:text-indigo-300
                hover:bg-indigo-100 dark:hover:bg-indigo-900/30
                transition-all duration-200
              "
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t("menu")}
            >
              {menuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile + Tablet Menu */}
        {menuOpen && (
          <div
            className="
            lg:hidden
            fixed w-full
            border-t border-indigo-100 dark:border-indigo-900/50
            bg-white dark:bg-gray-900
            animate-slide-down
            z-90
          "
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="
                    text-sm font-medium px-4 py-3 rounded-lg
                    text-indigo-700 dark:text-indigo-300
                    hover:bg-indigo-50 dark:hover:bg-indigo-900/30
                    hover:text-indigo-900 dark:hover:text-white
                    transition-all duration-200
                  "
                >
                  {item.label}
                </Link>
              ))}

              <ModeToggle />
            </nav>
          </div>
        )}
      </header>

      {showCart && (
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      )}
      {menuOpen && (
        <div className="inset-0 fixed bg-black/50 backdrop-blur-sm z-40"></div>
      )}
    </>
  );
}
