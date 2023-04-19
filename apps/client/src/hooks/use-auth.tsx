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
    // refactor
    onSettled: () => {
      tokenRefreshed = true;
    },
    onError: (error) => {
      tokenRefreshed = true;
      return error;
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
          return new Error('Unlogined');
        }
        refreshToken();
        logout();
      }
    },
  });
  const { mutate: signUp } = trpc.auth.register.useMutation({
    onSuccess: () => navigate(`${RoutesEnum.SignIn}`),
    onError: (error) => console.log(error),
  });
  const { mutate: signIn } = trpc.auth.login.useMutation({
    onSuccess: ({ user }) => {
      signInStore(user);
      return navigate(`${RoutesEnum.Home}`);
    },
    onError: (error) => console.log(error),
  });
  return { logout, signUp, signIn };
};
