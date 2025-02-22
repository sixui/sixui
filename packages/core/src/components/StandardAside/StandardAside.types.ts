import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISide } from '~/utils/types';
import type {
  IStandardAsideThemeFactory,
  standardAsideTheme,
} from './StandardAside.css';

export interface IStandardAsideChildrenRenderProps {
  close?: () => void;
}

export interface IStandardAsideOwnProps {
  side?: ISide;
  opened?: boolean;
  onClose?: () => void;
  onClosed?: () => void;
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
