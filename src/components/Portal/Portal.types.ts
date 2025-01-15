import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IBoxProps } from '../Box';

export interface IPortalOwnProps {
  target?: HTMLElement;
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IPortalProps extends IBoxProps, IPortalOwnProps {}

export type IPortalFactory = IComponentFactory<{
  props: IPortalProps;
  ref: HTMLDivElement;
}>;
