import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  drawerAsideTheme,
  IDrawerAsideThemeFactory,
} from './DrawerAside.css';
import { IDrawerOwnProps } from '~/components/Drawer/Drawer.types';

export interface IDrawerAsideChildrenRenderProps {
  close?: () => void;
}

export interface IDrawerAsideOwnProps
  extends IOmit<IDrawerOwnProps, 'children'> {
  children?:
    | React.ReactNode
    | ((props: IDrawerAsideChildrenRenderProps) => React.ReactNode);
  detached?: boolean;
}

export interface IDrawerAsideProps
  extends IBoxProps,
    IComponentThemeProps<IDrawerAsideThemeFactory>,
    IDrawerAsideOwnProps {}

export type IDrawerAsideFactory = IComponentFactory<{
  props: IDrawerAsideProps;
  ref: HTMLDivElement;
  theme: typeof drawerAsideTheme;
}>;
