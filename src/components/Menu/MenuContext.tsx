import type { Placement } from '@floating-ui/react';
import { createContext } from 'react';

export type IMenuContextValue = {
  isOpen: boolean;
  getTriggerProps: (
    userProps?: React.HTMLProps<HTMLButtonElement>,
  ) => Record<string, unknown>;
  triggerRef: React.Ref<HTMLButtonElement>;
  placement?: Placement;
};

const stub = (): never => {
  throw new Error(
    'You forgot to wrap your component in <MenuContext.Provider />.',
  );
};

export const MenuContext = createContext<IMenuContextValue>({
  isOpen: false,
  getTriggerProps: stub,
  triggerRef: stub,
  placement: undefined,
});
