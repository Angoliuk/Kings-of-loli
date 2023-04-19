import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { RouterOutputs } from '../../trpc';

type State = {
  user?: RouterOutputs['auth']['me'] | undefined;
};

type Actions = {
  signIn: (user?: RouterOutputs['auth']['me']) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      user: undefined,
      signIn: (user) => {
        set(() => ({
          user,
        }));
      },
      logout: () => {
        set(() => ({
          user: undefined,
        }));
      },
    }),
    {
      name: 'auth',
    },
  ),
);
