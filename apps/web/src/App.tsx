/* eslint-disable unicorn/filename-case */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFetch, httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader } from './components/loader/loader';
import { ModalProvider } from './components/modal-context/modal-context';
import { AppRouter } from './routes/app-router';
import { trpc } from './trpc';
// const outerHistory = () => {};

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [isLoading, setIsLoading] = useState(false);
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
          <ModalProvider>
            <AppRouter />
          </ModalProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </BrowserRouter>
  );
}
