import type { IBoxProps } from '~/components/Box';
import type { IDrawerAsideOwnProps } from '~/components/DrawerAside';
import type { IStandardAsideOwnProps } from '~/components/StandardAside';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IOmit } from '~/utils';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { asideTheme, IAsideThemeFactory } from './Aside.css';

export interface IAsideChildrenRenderProps {
  type: string;
  close?: (event?: React.MouseEvent) => void;
}

export interface IAsideOwnProps
  extends IOmit<IStandardAsideOwnProps, 'children'>,
    IOmit<IDrawerAsideOwnProps, 'children'> {
  drawer?: boolean;
  drawerRef?: React.RefObject<HTMLDivElement>;
  children?:
    | React.ReactNode
    | ((props: IAsideChildrenRenderProps) => React.ReactNode);
}

export interface IAsideProps
  extends IBoxProps,
    IComponentThemeProps<IAsideThemeFactory>,
    IAsideOwnProps {}

export type IAsideFactory = IComponentFactory<{
  props: IAsideProps;
  ref: HTMLDivElement;
  theme: typeof asideTheme;
}>;
