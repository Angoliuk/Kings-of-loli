import { Navigate, useNavigate } from 'react-router-dom';

import { RoutesEnum } from '../routes/app-route/app-route-enums';
import { useAuthStore } from '../store/auth-store/auth-store';
import { trpc } from '../trpc';

export const useAuth = () => {
  const userLogout = useAuthStore((state) => state.logout);
  const signInStore = useAuthStore((state) => state.signIn);
  const setToken = useAuthStore((state) => state.setToken);
  let tokenRefreshed = false;
  const navigate = useNavigate();

  const { mutate: refreshToken } = trpc.auth.refreshToken.useMutation({
    onSettled: () => {
      tokenRefreshed = true;
    },
    onSuccess: (data) => {
      tokenRefreshed = true;
      setToken(data.access_token);
      console.log(12_345);
    },
    onError: () => {
      tokenRefreshed = true;
    },
  });
  const { mutate: logout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      userLogout();
      return <Navigate to={RoutesEnum.SignIn} />;
    },
    onError: (error) => {
      console.log(1);
      console.log(tokenRefreshed);
      if (error.data?.httpStatus === 401) {
        console.log(2);
        if (tokenRefreshed) {
          tokenRefreshed = false;
          return new Error('Unlogined');
        }
        console.log(3);
        refreshToken();
        console.log(4);
        logout();
      }
    },
  });
  const { mutate: signUpMutation } = trpc.auth.register.useMutation({
    onSuccess: () => navigate(`${RoutesEnum.SignIn}`),
    onError: (error) => console.log(error),
  });
  const { mutate: signInMutation } = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      signInStore(data.access_token, data.user);
      return navigate(`${RoutesEnum.Home}`);
    },
    onError: (error) => console.log(error),
  });
  const signIn = (data: { nickname: string; password: string }) => {
    signInMutation({
      name: data.nickname,
      password: data.password,
    });
  };
  const signUp = (data: { nickname: string; password: string }) => {
    signUpMutation({
      name: data.nickname,
      password: data.password,
    });
  };
  return { logout, signUp, signIn };
};
