import type { IContainerProps } from '@/helpers/types';

export type ISvgIconProps = IContainerProps<never> & {
  icon: {
    name?: string;
    data: string;
  };
};
