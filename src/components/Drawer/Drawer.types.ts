import type { OpenChangeReason } from '@floating-ui/react';

import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { IPopoverBaseTriggerRendererProps } from '../PopoverBase';
import type { IDrawerStylesKey } from './Drawer.styles';

export type IDrawerVariant = 'standard' | 'detached';

export type IDrawerTriggerRenderProps = IOmit<
  IPopoverBaseTriggerRendererProps,
  'setRef' | 'getProps'
>;

export type IDrawerChildrenRenderProps = {
  close: (event?: React.MouseEvent) => void;
};

export type IDrawerProps = Pick<IPortalProps, 'root'> &
  IBaseProps<IDrawerStylesKey> & {
    opened?: boolean;
    defaultOpened?: boolean;
    disabled?: boolean;
    trigger?:
      | ((props: IDrawerTriggerRenderProps) => React.ReactElement)
      | React.ReactNode;
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    children:
      | ((renderProps: IDrawerChildrenRenderProps) => React.ReactNode)
      | React.ReactNode;
    variant?: IDrawerVariant;
  };
