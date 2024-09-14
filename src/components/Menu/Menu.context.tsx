import type { Placement } from '@floating-ui/react';

import { createSafeContext } from '~/helpers/createSafeContext';

export type IMenuContextValue = {
  opened: boolean;
  getTriggerProps: (
    userProps?: React.ComponentPropsWithoutRef<'button'>,
  ) => Record<string, unknown>;
  triggerRef: React.Ref<HTMLButtonElement>;
  placement?: Placement;
};

export const [MenuContextProvider, useMenuContext] =
  createSafeContext<IMenuContextValue>(
    'You forgot to wrap your component in <MenuContextProvider />.',
  );
