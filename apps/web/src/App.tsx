/* eslint-disable unicorn/filename-case */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFetch, httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './routes/app-router';
import { trpc } from './trpc';
export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_API_URL,
          fetch: (input, init?) => {
            return getFetch()(input, {
              ...init,
              credentials: 'include',
            });
          },
          headers() {
            return {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': '*',
              credentials: 'include',
            };
          },
        }),
      ],
    }),
  );
  return (
    <BrowserRouter>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </trpc.Provider>
    </BrowserRouter>
  );
}
