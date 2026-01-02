import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "Echo Store - Quality Products",
  description: "Your one-stop shop for quality products",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // Changed: params is now a Promise
}) {
  // Await the params before using it
  const { locale } = await params;
  
  const messages = await getMessages();

  if (!messages) notFound();

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <CartProvider>
                <div className="flex dark:bg-black min-h-screen flex-col bg-white">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </CartProvider>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}