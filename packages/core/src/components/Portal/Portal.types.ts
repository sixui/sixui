import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';

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
