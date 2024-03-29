import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '../routes/app-router-enum';
import { useAuthStore } from '../store/auth-store/auth-store';
import { trpc } from '../trpc';
type useAuthProperties = {
  onAuthError?: () => void;
};
export const useAuth = ({ onAuthError }: useAuthProperties = {}) => {
  const userLogout = useAuthStore((state) => state.logout);
  const signInStore = useAuthStore((state) => state.signIn);

  let tokenRefreshed = false;
  const navigate = useNavigate();

  const { mutate: refreshToken } = trpc.auth.refreshToken.useMutation({
    onSettled: () => {
      tokenRefreshed = true;
    },
    onError: (error) => {
      tokenRefreshed = true;

      userLogout();

      throw new Error(error.message);
    },
  });
  const { mutate: logout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      userLogout();
    },
    onError: (error) => {
      if (error.data?.httpStatus === 401) {
        if (tokenRefreshed) {
          tokenRefreshed = false;
          throw new Error('Unlogined');
        }

        refreshToken();

        logout();
      }
    },
  });

  const signUp = trpc.auth.register.useMutation({
    onSuccess: ({ user }) => {
      signInStore(user);
      return navigate(AppRoutes.Home);
    },
    onError: (error) => {
      new Error(error.message);
      onAuthError?.();
    },
  });
  const signIn = trpc.auth.login.useMutation({
    onSuccess: ({ user }) => {
      signInStore(user);
      return navigate(AppRoutes.Home);
    },
    onError: (error) => {
      new Error(error.message);
      onAuthError?.();
    },
  });
  return { logout, signUp, signIn };
};
