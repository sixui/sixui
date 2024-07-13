import type { IContainerProps } from '@/helpers/types';
import type { badgeStyles } from './Badge.styles';

export type IBadgeProps = IContainerProps<keyof typeof badgeStyles> & {
  children?: React.ReactNode;
  value?: number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
  invisible?: boolean;
  disabled?: boolean;
};
