import { Navigate, useNavigate } from 'react-router-dom';

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
    onSuccess: () => {
      tokenRefreshed = true;
    },
    onError: () => {
      tokenRefreshed = true;
    },
  });
  const { mutate: logout } = trpc.auth.logout.useMutation({
    onSuccess: () => {
      userLogout();
      // navigation hook instead of component
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
    onSuccess: ({ user }) => {
      signInStore(user);
      return navigate(`${RoutesEnum.Home}`);
    },
    onError: (error) => console.log(error),
  });
  const signIn = (data: { nickname: string; password: string }) => {
    // signIn is just useless wrapper
    signInMutation({
      name: data.nickname,
      password: data.password,
    });
  };
  const signUp = (data: { nickname: string; password: string }) => {
    // signUp is just useless wrapper
    signUpMutation({
      name: data.nickname,
      password: data.password,
    });
  };
  return { logout, signUp, signIn };
};
