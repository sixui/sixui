import type { Placement } from '@floating-ui/react';

import type { IOrientation } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IListItemProps } from '../ListItem';
import type { IMenuStylesKey } from './Menu.styles';
import type { IPortalProps } from '../Portal';

export type IMenuTriggerRenderProps = {
  opened: boolean;
  placement: Placement;
  getProps: (
    userProps?: React.ComponentPropsWithoutRef<'button'>,
  ) => Record<string, unknown>;
};

export type IMenuProps = IBaseProps<IMenuStylesKey> &
  Pick<IPortalProps, 'root'> & {
    trigger:
      | React.ReactNode
      | ((renderProps: IMenuTriggerRenderProps) => React.ReactNode);
    children: React.ReactNode;
    placement?: Placement;
    orientation?: IOrientation;
    matchTargetWidth?: boolean;
    size?: IListItemProps['scale'];
  };
