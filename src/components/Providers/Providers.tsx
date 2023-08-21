"use client";

import { setupStore } from "@/src/store/store";
import { Provider } from "react-redux";

const store = setupStore()

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};