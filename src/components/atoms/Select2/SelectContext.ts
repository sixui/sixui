import { useInteractions } from '@floating-ui/react';
import { createContext } from 'react';

export type ISelectContextValue = {
  activeIndex: number | null;
  selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'];
  handleSelect: (index: number | null) => void;
};

const stub = (): never => {
  throw new Error(
    'You forgot to wrap your component in <SelectContext.Provider />.',
  );
};

export const SelectContext = createContext<ISelectContextValue>({
  activeIndex: null,
  selectedIndex: null,
  getItemProps: stub,
  handleSelect: stub,
});
