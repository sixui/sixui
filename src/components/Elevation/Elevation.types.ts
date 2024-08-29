import type { IBoxProps } from '../Box';
import type { IElevationStyleName } from './Elevation.css';

export type IElevationProps = IBoxProps<IElevationStyleName> & {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
};
