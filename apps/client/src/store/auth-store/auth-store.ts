import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  token: string | undefined;
  isAuth: boolean;
  errors: Error | undefined;
};

type Actions = {
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: undefined,
      isAuth: false,
      errors: undefined,
      setToken: (token: string) =>
        set(() => ({
          token,
          isAuth: !!token,
        })),
      logout: () => set(() => ({ token: undefined, isAuth: false })),
    }),
    {
      name: 'auth',
    },
  ),
);
