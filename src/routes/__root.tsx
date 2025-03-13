import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HeadContent, Outlet, createRootRoute, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../global.css';

export const Route = createRootRoute({
  component: RootPage,
  head: () => ({
    title: 'Blind Spotting',
    meta: [
      { name: 'title', content: 'Blind Spotting' },
      {
        name: 'description',
        content:
          "Discover the roles where you'll naturally thrive with the E3 Behavioral Assessment. Get behavioral insights for personal and professional growth.",
      },
      { name: 'application_name', content: 'Blind Spotting Behavioral Assessment' },

      // Open Graph / Facebook
      { property: 'og:title', content: 'Blind Spotting' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'Blind Spotting' },
      { property: 'og:url', content: 'https://www.blindspotting.com/assessment' },
      {
        property: 'og:description',
        content:
          "Designed with your development in mind, the E3 Behavioral Assessment reveals the roles where you'll naturally thrive and delivers the behavioral insights you need.",
      },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image:alt', content: 'E3 Behavioral Assessment by Blind Spotting' },

      // For Analytics
      { property: 'fb:app_id', content: 'your_app_id' },
      { name: 'twitter:site', content: '@blindspotting' },

      // Favicon
      { name: 'msapplication-TileColor', content: '#3b82f6' },
      { name: 'theme-color', content: '#ffffff' },
    ],
  }),
});

function RootPage() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isIndexPage = pathname === '/';
  const bgColor = isIndexPage ? 'bg-[#F8F9FF]' : undefined;

  return (
    <>
      <HeadContent />
      <div className="grid min-h-screen">
        <main className="grid h-full grid-rows-[auto_1fr_auto]">
          <Navbar className={bgColor} />
          <main className={cn('h-full w-full', bgColor)}>
            <Outlet />
          </main>
          <Footer className={bgColor} />
        </main>
      </div>
      <TanStackDevtools />
    </>
  );
}

function TanStackDevtools() {
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackRouterDevtools />
    </>
  );
}
