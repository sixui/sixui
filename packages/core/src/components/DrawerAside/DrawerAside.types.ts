import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISide } from '~/utils/types';
import type {
  drawerAsideTheme,
  IDrawerAsideThemeFactory,
} from './DrawerAside.css';

export interface IDrawerAsideChildrenRenderProps {
  type: string;
  close?: (event?: React.MouseEvent) => void;
}

export interface IDrawerAsideOwnProps {
  side?: ISide;
  opened?: boolean;
  onClose?: (event?: React.MouseEvent) => void;
  children?:
    | React.ReactNode
    | ((props: IDrawerAsideChildrenRenderProps) => React.ReactNode);
  root?: HTMLElement | null;
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
