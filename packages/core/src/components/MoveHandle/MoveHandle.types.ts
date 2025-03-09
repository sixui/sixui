import type { IBoxProps } from '~/components/Box';
import type { IIconButtonOwnProps } from '~/components/IconButton';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit, IOrientation, ISide } from '~/utils/types';
import type {
  IMoveHandleThemeFactory,
  moveHandleTheme,
} from './MoveHandle.css';
import type { MoveHandleIndicator } from './MoveHandleIndicator';

export interface IMoveHandleOwnProps
  extends IOmit<IIconButtonOwnProps, 'icon'> {
  orientation?: IOrientation;
  position?: ISide;
}

export interface IMoveHandleProps
  extends IBoxProps,
    IComponentThemeProps<IMoveHandleThemeFactory>,
    IMoveHandleOwnProps {}

export type IMoveHandleFactory = IComponentFactory<{
  props: IMoveHandleProps;
  ref: HTMLButtonElement;
  theme: typeof moveHandleTheme;
  staticComponents: {
    Indicator: typeof MoveHandleIndicator;
  };
}>;
