import { createContext, useContext } from 'react';

export const ScrollContainerContext = createContext<React.RefObject<HTMLElement | null> | undefined>(
  undefined,
);

export function useScrollContainer() {
  return useContext(ScrollContainerContext);
}
