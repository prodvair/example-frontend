import { ReactNode, createContext, useContext } from "react";

import { Class } from "@/app/types/utils/Class";

interface HydratableStore<DehydratedStore> {
  hydrate(dehydratedStore: DehydratedStore): void;
}

export function createStoreContext<
  DehydratedStore,
  Store extends HydratableStore<DehydratedStore>
>(providerName: string, consumerName: string, StoreClass: Class<Store>) {
  let store: Store;

  function initializeStore(initialState?: DehydratedStore): Store {
    const _store = store ?? new StoreClass();

    // If page has Next.js data fetching methods that use a Mobx store, it will
    // get hydrated here
    if (initialState) {
      _store.hydrate(initialState);
    }

    // For SSG and SSR always create a new store
    if (typeof window === "undefined") return _store;

    // Create the store once in the client
    if (!store) store = _store;

    return _store;
  }

  const StoreContext = createContext<Store | undefined>(undefined);

  function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
      throw new Error(
        `\`${consumerName}\` must be used within \`${providerName}\``
      );
    }

    return context;
  }

  type StoreProviderProps = {
    children: ReactNode;
    initialState?: DehydratedStore;
  };

  function StoreProvider({ children, initialState }: StoreProviderProps) {
    const store = initializeStore(initialState);

    return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    );
  }

  return [StoreProvider, useStore] as const;
}
