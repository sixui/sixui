import type { Placement } from '@floating-ui/react';
import { createContext } from 'react';

export type ITooltipContextValue = {
  isOpen: boolean;
  getTriggerProps: (
    userProps?: React.HTMLProps<HTMLButtonElement>,
  ) => Record<string, unknown>;
  triggerRef: React.Ref<HTMLButtonElement>;
  placement?: Placement;
};

const stub = (): never => {
  throw new Error(
    'You forgot to wrap your component in <TooltipContext.Provider />.',
  );
};

export const TooltipContext = createContext<ITooltipContextValue>({
  isOpen: false,
  getTriggerProps: stub,
  triggerRef: stub,
  placement: undefined,
});
