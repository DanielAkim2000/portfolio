import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** false côté serveur et à l'hydratation, true ensuite côté client. */
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
