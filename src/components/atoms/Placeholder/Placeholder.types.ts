import type { IContainerProps } from '@/helpers/types';
import type { IPlaceholderStylesKey } from './Placeholder.styles';

export type IPlaceholderProps = IContainerProps<IPlaceholderStylesKey> & {
  label?: string;
  children?: React.ReactNode;
  role?: string;
  tabIndex?: number;
  crosshairs?: boolean;
  shape?: 'rounded' | 'rectangular' | 'circular';
};
