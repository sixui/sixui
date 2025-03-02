import type { IBoxProps } from '~/components/Box';
import type { IIconButtonOwnProps } from '~/components/IconButton';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMakeOptional, IOrientation } from '~/utils/types';
import type {
  IMoveHandleThemeFactory,
  moveHandleTheme,
} from './MoveHandle.css';

export interface IMoveHandleOwnProps
  extends IMakeOptional<IIconButtonOwnProps, 'icon'> {
  orientation?: IOrientation;
}

export interface IMoveHandleProps
  extends IBoxProps,
    IComponentThemeProps<IMoveHandleThemeFactory>,
    IMoveHandleOwnProps {}

export type IMoveHandleFactory = IComponentFactory<{
  props: IMoveHandleProps;
  ref: HTMLButtonElement;
  theme: typeof moveHandleTheme;
}>;
