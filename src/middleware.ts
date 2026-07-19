import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'ar', 'fr'];

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
