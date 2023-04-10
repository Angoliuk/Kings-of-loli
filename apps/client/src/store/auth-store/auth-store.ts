import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { RouterOutputs } from '../../trpc';
interface State {
  profile: RouterOutputs['auth']['me'] | undefined;
  isAuth: boolean;
  token: string | undefined;
}

interface Actions {
  setToken: (token: string) => void;
  signIn: (access_token: string | undefined, user: RouterOutputs['auth']['me'] | undefined) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      profile: undefined,
      isAuth: false,
      token: undefined,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: !!token,
        })),
      signIn: (access_token, user) => {
        set(() => ({
          token: access_token,
          profile: user,
          isAuth: !!access_token,
        }));
      },
      logout: () => {
        set(() => ({
          profile: undefined,
          isAuth: false,
          token: undefined,
        }));
      },
    }),
    {
      name: 'auth',
    },
  ),
);
