import type { IContainerProps } from '@/helpers/types';

export type ISvgIconProps = IContainerProps & {
  icon: {
    name?: string;
    data: string;
  };
};
