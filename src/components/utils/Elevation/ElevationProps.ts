import type { IContainerProps } from '@/helpers/types';
import type { IElevationStyleKey } from './Elevation.styledefs';

export type IElevationProps = IContainerProps<IElevationStyleKey> & {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
};
