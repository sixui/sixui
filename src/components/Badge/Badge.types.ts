import type { IBaseProps } from '../Base';
import type { IBadgeStylesKey } from './Badge.styles';

export type IBadgeProps = IBaseProps<IBadgeStylesKey> & {
  value?: string | number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
};
