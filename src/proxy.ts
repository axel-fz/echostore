import createMiddleware from 'next-intl/middleware'; 
import { routing } from './i18n/routing'; 

export default createMiddleware(routing); 

export const config = { 
  // Match all pathnames except for:
  // - API routes (/api/...)
  // - tRPC routes (/trpc/...)
  // - Next.js internals (/_next/...)
  // - Static files (files with extensions like .png, .jpg, .css, etc.)
  matcher: [
    '/',
    '/(en|fr)/:path*',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
};