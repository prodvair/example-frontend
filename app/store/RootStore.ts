import UIStore, { DehydratedUIStore } from "./UIStore";

export interface DehydratedRootStore {
  uiStore: DehydratedUIStore;
}

export default class RootStore {
  uiStore: UIStore;

  constructor() {
    this.uiStore = new UIStore();
  }

  hydrate = (data: DehydratedRootStore | undefined) => {
    if (!data) return;

    if (data.uiStore) {
      this.uiStore.hydrate(data.uiStore);
    }
  };
}
