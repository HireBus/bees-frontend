import { HeadContent, Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../global.css';

export const Route = createRootRoute({
  component: RootPage,
  head: () => ({
    title: 'Template React Vite',
    meta: [
      { name: 'title', content: 'Template React Vite' },
      { name: 'description', content: 'Template React Vite' },
      { name: 'application_name', content: 'Template React Vite App' },

      // Open Graph / Facebook
      { property: 'og:title', content: 'Template React Vite' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Template React Vite' },
      { property: 'og:url', content: 'https://www.youtube.com/bossRODTV' },
      { property: 'og:description', content: 'Template React Vite' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image:alt', content: 'banner_description' },

      // For Analytics
      { property: 'fb:app_id', content: 'your_app_id' },
      { name: 'twitter:site', content: '@username' },

      // Favicon
      { name: 'msapplication-TileColor', content: '#3b82f6' },
      { name: 'theme-color', content: '#ffffff' },
    ],
  }),
});

function RootPage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <HeadContent />
      <div className="relative grid min-h-screen grid-rows-[1fr_auto]">
        <main className="h-full">
          <Outlet />
        </main>
        <footer className="absolute bottom-0 flex w-full items-center justify-between px-10 py-4 text-sm text-gray-600">
          <div>© {currentYear} Behavioral Essentials</div>
          <div>
            Need Help?{' '}
            <Link to="/" className="text-primary hover:underline">
              Contact support@behavioralessentials.com
            </Link>
          </div>
        </footer>
        {process.env.NODE_ENV === 'development' && <TanStackRouterDevtools />}
      </div>
    </>
  );
}
