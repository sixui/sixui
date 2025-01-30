import type { FloatingFocusManagerProps, Placement } from '@floating-ui/react';

import type { IBoxProps } from '~/components/Box';
import type { ListDivider } from '~/components/List/ListDivider';
import type { IMotionProps } from '~/components/Motion';
import type { IPortalProps } from '~/components/Portal';
import type { IOrientation, IPlacement } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IMenuThemeFactory, menuTheme } from './Menu.css';
import type { MenuItem } from './MenuItem';
import type { MenuList } from './MenuList';

export type IMenuTriggerRenderProps = {
  opened: boolean;
  placement: Placement;
  getProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
};

export interface IMenuOwnProps {
  trigger:
    | React.ReactNode
    | ((renderProps: IMenuTriggerRenderProps) => React.ReactNode);
  children: React.ReactNode;
  placement?: IPlacement;
  orientation?: IOrientation;
  matchTargetWidth?: boolean;
  floatingFocusManagerProps?: Partial<FloatingFocusManagerProps>;
  motionProps?: Partial<IMotionProps>;
  portalProps?: Partial<IPortalProps>;
}

export interface IMenuProps
  extends IBoxProps,
    IComponentThemeProps<IMenuThemeFactory>,
    IMenuOwnProps {}

export type IMenuFactory = IComponentFactory<{
  props: IMenuProps;
  ref: HTMLDivElement;
  theme: typeof menuTheme;
  staticComponents: {
    List: typeof MenuList;
    Item: typeof MenuItem;
    Divider: typeof ListDivider;
  };
}>;
