import { type IoServerToClientEvents } from '@kol/shared-game/interfaces';
import { bindObject } from '@web/modules/match/match-store/temporary';
import { type RouterOutputs } from '@web/trpc';
import { create } from 'zustand';
import { combine, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    combine({} as { user?: RouterOutputs['auth']['me'] }, (set, get) =>
      bindObject({
        signIn: (user: RouterOutputs['auth']['me']) => {
          set({ user });
        },
        update: (user: Parameters<IoServerToClientEvents['user-update']>[0]) => {
          const previousUser = get().user;
          previousUser && set({ user: { ...previousUser, ...user } });
        },
        logout: () => {
          set({ user: undefined });
        },
      }),
    ),
    { name: 'user' },
  ),
);
