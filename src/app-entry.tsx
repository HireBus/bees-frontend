import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { Toaster } from './components/ui/toast/sonner';
import { AuthProvider } from './contexts/auth';
import { BeesApiClientProvider } from './contexts/bees-api-client';
import { LayoutsProvider } from './contexts/layouts';
import { ThemeProvider } from './contexts/theme';
import { ToastClientProvider } from './contexts/toast-client';
import './global.css';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const router = createRouter({
  routeTree,
  context: {},
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastClientProvider>
        <LayoutsProvider>
          <QueryClientProvider client={queryClient}>
            <BeesApiClientProvider>
              <AuthProvider>
                <RouterProvider router={router} />
                <Toaster position="top-right" />
              </AuthProvider>
            </BeesApiClientProvider>
          </QueryClientProvider>
        </LayoutsProvider>
      </ToastClientProvider>
    </ThemeProvider>
  );
}
