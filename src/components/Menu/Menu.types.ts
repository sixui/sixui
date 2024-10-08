import type { FloatingFocusManagerProps, Placement } from '@floating-ui/react';

import type { IOrientation, IPlacement } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IMotionProps } from '../Motion';
import type { IPortalProps } from '../Portal';
import type { IMenuLeafThemeFactory, menuLeafTheme } from './MenuLeaf.css';

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
    IComponentThemeProps<IMenuLeafThemeFactory>,
    IMenuOwnProps {}

export type IMenuFactory = IComponentFactory<{
  props: IMenuProps;
  ref: HTMLDivElement;
  theme: typeof menuLeafTheme;
}>;
