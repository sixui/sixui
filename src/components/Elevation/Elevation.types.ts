import type { IBaseProps } from '../Base';
import type { IElevationStylesKey } from './Elevation.styles';

export type IElevationProps = IBaseProps<IElevationStylesKey> & {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
};
