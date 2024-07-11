import type { IContainerProps } from '@/helpers/types';
import type { IPlaceholderStyleKey } from './Placeholder.styledefs';

export type IPlaceholderProps = IContainerProps<IPlaceholderStyleKey> & {
  label?: string;
  children?: React.ReactNode;
  role?: string;
  tabIndex?: number;
  crosshairs?: boolean;
  shape?: 'rounded' | 'rectangular' | 'circular';
};
