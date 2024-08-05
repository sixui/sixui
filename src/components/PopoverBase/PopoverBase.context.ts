import { Placement, ReferenceType } from '@floating-ui/react';

import type { IExtendedHtmlFloatingProps } from '~/helpers/extendFloatingProps';
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
   *
   * @param userProps - All event handlers you pass in should be done so through
   * the this argument. This is because your handler may be either overwritten
   * or overwrite one of the Floating UI hooks' handlers.
   */
  getTriggerProps: (
    userProps?: IExtendedHtmlFloatingProps,
  ) => IExtendedHtmlFloatingProps;
};

export const [PopoverBaseContextProvider, usePopoverBaseContext] =
  createSafeContext<IPopoverBaseContextValue>(
    'You forgot to wrap your component in <PopoverBaseContext.Provider />.',
  );
