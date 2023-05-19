import { type RouterOutputs } from '@web/trpc';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  user?: RouterOutputs['auth']['me'];
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
