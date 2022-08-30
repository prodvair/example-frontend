import { makeAutoObservable } from "mobx";

export interface DehydratedUIStore {
  sideMenuIsActive?: boolean;
}

export default class UIStore {
  sideMenuIsActive: DehydratedUIStore["sideMenuIsActive"] = false;

  constructor() {
    makeAutoObservable(this);
  }

  openSideMenu() {
    this.sideMenuIsActive = true;
  }

  closeSideMenu() {
    this.sideMenuIsActive = false;
  }

  toggleSideMenu() {
    this.sideMenuIsActive = !this.sideMenuIsActive;
  }

  hydrate = (data: DehydratedUIStore | undefined) => {
    if (!data) return;

    if (data.sideMenuIsActive !== undefined) {
      this.sideMenuIsActive = data.sideMenuIsActive;
    }
  };
}
