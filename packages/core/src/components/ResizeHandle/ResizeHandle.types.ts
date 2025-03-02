import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IOrientation } from '~/utils';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IResizeHandleThemeFactory,
  resizeHandleTheme,
} from './ResizeHandle.css';

export interface IResizeHandleOwnProps extends IPaperOwnProps {
  orientation?: IOrientation;
}

export interface IResizeHandleProps
  extends IBoxProps,
    IComponentThemeProps<IResizeHandleThemeFactory>,
    IResizeHandleOwnProps {}

export type IResizeHandleFactory = IComponentFactory<{
  props: IResizeHandleProps;
  ref: HTMLDivElement;
  theme: typeof resizeHandleTheme;
}>;
