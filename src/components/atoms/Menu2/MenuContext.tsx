import { createContext } from 'react';

export type IMenuContextValue = {
  getItemProps: (
    userProps?: React.HTMLProps<HTMLButtonElement>,
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setHasFocusInside: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
};

const stub = (): never => {
  throw new Error(
    'You forgot to wrap your component in <MenuContext.Provider />.',
  );
};

export const MenuContext = createContext<IMenuContextValue>({
  getItemProps: () => ({}),
  activeIndex: null,
  setActiveIndex: stub,
  setHasFocusInside: stub,
  isOpen: false,
});
