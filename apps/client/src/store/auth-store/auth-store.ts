import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { RouterOutputs } from '../../trpc';

type State = {
  profile: RouterOutputs['auth']['me'] | undefined;
  isAuth: boolean;
  token: string | undefined;
};

type Actions = {
  setToken: (token: string | undefined) => void;
  signIn: (access_token: string | undefined, user: RouterOutputs['auth']['me'] | undefined) => void;
  logout: () => void;
};

export let token: string | undefined;
export const setToken = (newToken?: string | undefined) => {
  token = newToken;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      profile: undefined,
      isAuth: false,
      token: undefined,
      setToken: (token: string) => {
        setToken(token);
        set(() => ({
          token,
          isAuth: !!token,
        }));
      },
      signIn: (access_token, user) => {
        setToken(access_token);
        set(() => ({
          token: access_token,
          profile: user,
          isAuth: !!access_token,
        }));
      },
      logout: () => {
        setToken();
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
