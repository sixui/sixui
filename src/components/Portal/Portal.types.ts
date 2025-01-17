import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IBoxProps } from '../Box';

export interface IPortalOwnProps {
  root?: HTMLElement | null;
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IPortalProps extends IBoxProps, IPortalOwnProps {}

export type IPortalFactory = IComponentFactory<{
  props: IPortalProps;
  ref: HTMLDivElement;
}>;
