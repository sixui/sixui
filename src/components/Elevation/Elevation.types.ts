import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { elevationStyles, IElevationStylesFactory } from './Elevation.css';

export type IElevationOwnProps = {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
};

export interface IElevationProps
  extends IBoxProps,
    IStylesProps<IElevationStylesFactory>,
    IElevationOwnProps {}

export type IElevationFactory = IComponentFactory<{
  props: IElevationProps;
  ref: HTMLDivElement;
  styles: typeof elevationStyles;
}>;
