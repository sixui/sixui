import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';

export interface ISvgIconOwnProps {
  icon: {
    name?: string;
    data: string;
  };
}

export interface ISvgIconProps extends IBoxProps, ISvgIconOwnProps {}

export type ISvgIconFactory = IComponentFactory<{
  props: ISvgIconProps;
  ref: HTMLDivElement;
}>;
