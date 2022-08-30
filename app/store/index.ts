import { enableStaticRendering } from "mobx-react-lite";

export * from "./RootStore";
export * from "./RootStoreProvider";

enableStaticRendering(typeof window === "undefined");
