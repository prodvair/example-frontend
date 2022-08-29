import type { AppProps } from "next/app";

import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";

import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default appWithTranslation(MyApp);
