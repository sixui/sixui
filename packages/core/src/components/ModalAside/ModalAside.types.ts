import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISide } from '~/utils/types';
import type {
  IModalAsideThemeFactory,
  modalAsideTheme,
} from './ModalAside.css';

export interface IModalAsideChildrenRenderProps {
  type: string;
  close?: (event?: React.MouseEvent) => void;
}

export interface IModalAsideOwnProps {
  side?: ISide;
  opened?: boolean;
  onClose?: (event?: React.MouseEvent) => void;
  children?:
    | React.ReactNode
    | ((props: IModalAsideChildrenRenderProps) => React.ReactNode);
  root?: HTMLElement | null;
  detached?: boolean;
}

export interface IModalAsideProps
  extends IBoxProps,
    IComponentThemeProps<IModalAsideThemeFactory>,
    IModalAsideOwnProps {}

export type IModalAsideFactory = IComponentFactory<{
  props: IModalAsideProps;
  ref: HTMLDivElement;
  theme: typeof modalAsideTheme;
}>;
