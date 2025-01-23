import type { ISide } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IStandardAsideThemeFactory,
  standardAsideTheme,
} from './StandardAside.css';

export interface IStandardAsideChildrenRenderProps {
  type: string;
  close?: (event?: React.MouseEvent) => void;
}

export interface IStandardAsideOwnProps {
  side?: ISide;
  opened?: boolean;
  onClose?: (event?: React.MouseEvent) => void;
  children?:
    | React.ReactNode
    | ((props: IStandardAsideChildrenRenderProps) => React.ReactNode);
  wide?: boolean;
}

export interface IStandardAsideProps
  extends IBoxProps,
    IComponentThemeProps<IStandardAsideThemeFactory>,
    IStandardAsideOwnProps {}

export type IStandardAsideFactory = IComponentFactory<{
  props: IStandardAsideProps;
  ref: HTMLDivElement;
  theme: typeof standardAsideTheme;
}>;
