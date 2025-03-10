import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';

export interface ITabsPanelOwnProps {
  children?: React.ReactNode;
  anchor: string;
}

export interface ITabsPanelProps extends IBoxProps, ITabsPanelOwnProps {}

export type ITabsPanelFactory = IComponentFactory<{
  props: ITabsPanelProps;
  ref: HTMLDivElement;
}>;
