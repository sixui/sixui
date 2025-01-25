import type { Placement } from '@floating-ui/react';

import { createOptionalContext } from '~/helpers/createOptionalContext';

export type IMenuItemContextValue = {
  getItemProps: (
    userProps?: Record<string, unknown>,
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  opened: boolean;
  placement?: Placement;
};

export const [MenuItemContextProvider, useMenuItemContext] =
  createOptionalContext<IMenuItemContextValue>();
