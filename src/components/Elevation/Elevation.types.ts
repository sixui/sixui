import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { elevationStyles, IElevationStylesFactory } from './Elevation.css';

export type IElevationProps = IBoxProps &
  IStylesProps<IElevationStylesFactory> & {
    level?: 0 | 1 | 2 | 3 | 4 | 5;
    disabled?: boolean;
  };

export type IElevationFactory = IComponentFactory<{
  props: IElevationProps;
  ref: HTMLDivElement;
  styles: typeof elevationStyles;
}>;
