/* eslint-disable unicorn/filename-case */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';

import { AppRoute } from './routes/app-route/app-route';
import { token } from './store/auth-store/auth-store';
import { trpc } from './trpc';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:5520/trpc',
          headers() {
            return {
              authorization: token,
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': '*',
              'Access-Control-Allow-Headers': 'Content-Type',
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
        <AppRoute />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
