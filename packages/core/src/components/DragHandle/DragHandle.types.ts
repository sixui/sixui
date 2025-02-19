import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IOrientation } from '~/utils';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IDragHandleThemeFactory,
  resizeHandleTheme,
} from './DragHandle.css';

export interface IDragHandleOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  orientation?: IOrientation;
}

export interface IDragHandleProps
  extends IBoxProps,
    IComponentThemeProps<IDragHandleThemeFactory>,
    IDragHandleOwnProps {}

export type IDragHandleFactory = IComponentFactory<{
  props: IDragHandleProps;
  ref: HTMLDivElement;
  theme: typeof resizeHandleTheme;
}>;
