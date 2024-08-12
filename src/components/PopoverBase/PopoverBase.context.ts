import { Placement, ReferenceType } from '@floating-ui/react';

import { createSafeContext } from '~/helpers/createSafeContext';

export type IPopoverBaseContextValue = {
  isOpen: boolean;
  placement: Placement;
  close: (event?: React.MouseEvent) => void;

  /**
   * A callback to set the trigger element.
   */
  setTriggerRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   */
  getTriggerProps: () => React.HTMLProps<HTMLElement>;
};

export const [PopoverBaseContextProvider, usePopoverBaseContext] =
  createSafeContext<IPopoverBaseContextValue>(
    'You forgot to wrap your component in <PopoverBaseContext.Provider />.',
  );
