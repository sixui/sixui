import type { Placement } from '@floating-ui/react';

import type { IElementProps } from '~/components/Box';
import { createSafeContext } from '~/helpers/createSafeContext';

export type IMenuItemContextValue = {
  getItemProps: (
    userProps?: IElementProps<'button'>,
  ) => Record<string, unknown>;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  opened: boolean;
  placement?: Placement;
};

export const [MenuItemContextProvider, useMenuItemContext] =
  createSafeContext<IMenuItemContextValue>(
    'You forgot to wrap your component in <MenuItemContextProvider />.',
  );
