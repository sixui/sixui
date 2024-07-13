import type { IContainerProps } from '@/helpers/types';
import type { IBadgeStyleKey } from './Badge.styles';

export type IBadgeProps = IContainerProps<IBadgeStyleKey> & {
  children?: React.ReactNode;
  value?: number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
  invisible?: boolean;
  disabled?: boolean;
};
