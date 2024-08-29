import type { IBoxProps } from '../Box';
import type { IBadgeStyleName } from './Badge.css';

export type IBadgeProps = IBoxProps<IBadgeStyleName> & {
  value?: string | number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
};
