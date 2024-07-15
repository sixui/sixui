import type { Placement } from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';

export type IMenuTriggerRenderProps = {
  isOpen: boolean;
  placement: Placement;
  getProps: (
    userProps?: React.HTMLProps<HTMLButtonElement>,
  ) => Record<string, unknown>;
};

export type IMenuProps = IOmit<IContainerProps, 'styles'> & {
  trigger:
    | React.ReactNode
    | ((renderProps: IMenuTriggerRenderProps) => React.ReactNode);
  children: React.ReactNode;
  placement?: Placement;
  matchTargetWidth?: boolean;
};
