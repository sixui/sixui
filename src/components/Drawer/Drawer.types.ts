import type { IOmit, ISide } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { drawerTheme, IDrawerThemeFactory } from './Drawer.css';

export type IDrawerVariant = 'standard' | 'detached';

export type IDrawerChildrenRenderProps = {
  close: (event?: React.MouseEvent) => void;
};

export interface IDrawerOwnProps {
  root?: HTMLElement | null;
  opened?: boolean;
  defaultOpened?: boolean;
  onClose?: () => void;
  disabled?: boolean;
  side?: ISide;
  children:
    | ((renderProps: IDrawerChildrenRenderProps) => React.ReactNode)
    | React.ReactNode;
  fullHeight?: boolean;
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
