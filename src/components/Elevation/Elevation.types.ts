import type { IContainerProps } from '@/helpers/types';
import type { IElevationStylesKey } from './Elevation.styles';

export type IElevationProps = IContainerProps<IElevationStylesKey> & {
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  disabled?: boolean;
};
