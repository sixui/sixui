import type { IBoxProps } from '../Box';
import type { IBadgeClassName } from './Badge.css';

export type IBadgeProps = IBoxProps<IBadgeClassName> & {
  value?: string | number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
};
