import 'companion/styles/globals.css';

import { api } from 'companion/utils/api';
import { type AppType } from 'next/app';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
