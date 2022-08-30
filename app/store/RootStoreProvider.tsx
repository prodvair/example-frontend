import { createStoreContext } from "@/app/utils/createStoreContext";

import RootStore from "./RootStore";

export const [RootStoreProvider, useRootStore] = createStoreContext(
  "RootStoreProvider",
  "useRootStore",
  RootStore
);

export function useUIStore() {
  const { uiStore } = useRootStore();

  return uiStore;
}
