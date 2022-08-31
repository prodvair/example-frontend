import React, { Component } from "react";

import type { AppProps } from "next/app";

import { DehydratedRootStore, RootStoreProvider } from "@/app/store";
import { Page } from "@/app/types/Page";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { appWithTranslation } from "next-i18next";

import "@/style.css";

export type MyAppProps = AppProps & {
  Component: Page;
  pageProps: {
    initialState?: DehydratedRootStore;
    dehydratedState?: DehydratedState;
    [key: string]: any;
  };
};

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            staleTime: 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const getLayout = Component.getLayout ?? ((page) => page);
  const Layout = Component.layout ?? React.Fragment;

  return (
    <RootStoreProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>{getLayout(<Component {...pageProps} />)}</Layout>
        </Hydrate>
      </QueryClientProvider>
    </RootStoreProvider>
  );
}

export default appWithTranslation(MyApp);
