/* eslint-disable unicorn/filename-case */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFetch, httpBatchLink } from '@trpc/client';
import { useState } from 'react';

import { AppRouter } from './routes/app-router';
import { trpc } from './trpc';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:5520/trpc',
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
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
