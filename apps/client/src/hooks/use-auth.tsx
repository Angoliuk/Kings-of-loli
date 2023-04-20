import { useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../routes/app-route/app-route-enums';
import { useAuthStore } from '../store/auth-store/auth-store';
import { trpc } from '../trpc';

export const useAuth = () => {
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
  const { mutate: signUp } = trpc.auth.register.useMutation({
    onSuccess: () => navigate(`${RoutesEnum.SignIn}`),
    onError: (error) => new Error(error.message),
  });
  const { mutate: signIn } = trpc.auth.login.useMutation({
    onSuccess: ({ user }) => {
      signInStore(user);
      return navigate(`${RoutesEnum.Home}`);
    },
    onError: (error) => new Error(error.message),
  });
  return { logout, signUp, signIn };
};
