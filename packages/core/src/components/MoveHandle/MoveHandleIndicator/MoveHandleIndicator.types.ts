import type { IBoxProps } from '~/components/Box';
import type { ISvgIconOwnProps } from '~/components/SvgIcon';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit, IOrientation } from '~/utils/types';

export interface IMoveHandleIndicatorOwnProps
  extends IOmit<ISvgIconOwnProps, 'icon'> {
  orientation: IOrientation;
  active?: boolean;
}

export interface IMoveHandleIndicatorProps
  extends IBoxProps,
    IMoveHandleIndicatorOwnProps {}

export type IMoveHandleIndicatorFactory = IComponentFactory<{
  props: IMoveHandleIndicatorProps;
  ref: HTMLDivElement;
}>;
