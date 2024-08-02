import type { IContainerProps } from '~/helpers/types';
import type { IBadgeStylesKey } from './Badge.styles';

export type IBadgeProps = IContainerProps<IBadgeStylesKey> & {
  value?: string | number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
};
