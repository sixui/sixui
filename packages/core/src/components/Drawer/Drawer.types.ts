import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISide } from '~/utils/types';
import type { drawerTheme, IDrawerThemeFactory } from './Drawer.css';
import { IPopoverBaseOwnProps } from '~/components/PopoverBase';

export const drawerVariants = ['standard', 'detached'] as const;
export type IDrawerVariant = (typeof drawerVariants)[number];

export type IDrawerChildrenRenderProps = {
  close: (event?: React.MouseEvent) => void;
};

export interface IDrawerOwnProps
  extends Pick<
    IPopoverBaseOwnProps,
    | 'portalProps'
    | 'withoutPortal'
    | 'opened'
    | 'defaultOpened'
    | 'onClose'
    | 'onClosed'
    | 'disabled'
    | 'modal'
    | 'jail'
  > {
  side?: ISide;
  children:
    | ((props: IDrawerChildrenRenderProps) => React.ReactNode)
    | React.ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

export interface IDrawerProps
  extends IBoxProps,
    IComponentThemeProps<IDrawerThemeFactory>,
    IDrawerOwnProps {}

export type IDrawerFactory = IComponentFactory<{
  props: IDrawerProps;
  ref: HTMLDivElement;
  theme: typeof drawerTheme;
}>;
