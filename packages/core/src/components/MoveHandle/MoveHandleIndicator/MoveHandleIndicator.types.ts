import type { IBoxProps } from '~/components/Box';
import type { ISvgIconOwnProps } from '~/components/SvgIcon';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit, IOrientation } from '~/utils/types';
import type {
  IMoveHandleIndicatorThemeFactory,
  moveHandleIndicatorTheme,
} from './MoveHandleIndicator.css';

export interface IMoveHandleIndicatorOwnProps
  extends IOmit<ISvgIconOwnProps, 'icon'> {
  orientation: IOrientation;
  active?: boolean;
  disabled?: boolean;
}

export interface IMoveHandleIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IMoveHandleIndicatorThemeFactory>,
    IMoveHandleIndicatorOwnProps {}

export type IMoveHandleIndicatorFactory = IComponentFactory<{
  props: IMoveHandleIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof moveHandleIndicatorTheme;
}>;
