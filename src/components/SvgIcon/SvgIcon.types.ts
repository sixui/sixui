import type { IBaseProps } from '../Base';

export type ISvgIconProps = IBaseProps & {
  icon: {
    name?: string;
    data: string;
  };
};
