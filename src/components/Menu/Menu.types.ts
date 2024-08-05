import type { Placement } from '@floating-ui/react';

import type { IOmit, IOrientation } from '~/helpers/types';
import type { IBaseProps } from '../Base';

export type IMenuTriggerRenderProps = {
  isOpen: boolean;
  placement: Placement;
  getProps: (
    userProps?: React.ComponentPropsWithoutRef<'button'>,
  ) => Record<string, unknown>;
};

export type IMenuProps = IOmit<IBaseProps, 'styles'> & {
  trigger:
    | React.ReactNode
    | ((renderProps: IMenuTriggerRenderProps) => React.ReactNode);
  children: React.ReactNode;
  placement?: Placement;
  orientation?: IOrientation;
  matchTargetWidth?: boolean;
};
