import type { IContainerProps } from '~/helpers/types';
import type { IBadgeStylesKey } from './Badge.styles';

export type IBadgeProps = IContainerProps<IBadgeStylesKey> & {
  children?: React.ReactNode;
  value?: number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
  invisible?: boolean;
  disabled?: boolean;
};
