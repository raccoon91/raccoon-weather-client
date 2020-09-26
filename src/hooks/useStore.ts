import React from "react";
import { MobXProviderContext } from "mobx-react";
import { RootStore } from "src/stores";

export const useStores = () => {
  return React.useContext<Record<string, RootStore>>(MobXProviderContext);
};
