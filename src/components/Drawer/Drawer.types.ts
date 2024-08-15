import type { OpenChangeReason, ReferenceType } from '@floating-ui/react';

import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { IDrawerStylesKey } from './Drawer.styles';

export type IDrawerVariant = 'standard' | 'detached';

export type IDrawerTriggerRenderProps = {
  /**
   * Whether the bottom sheet is open.
   */
  isOpen: boolean;

  /**
   * A callback to set the trigger element.
   */
  setRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   */
  getProps: () => Record<string, unknown>;
};

export type IDrawerChildrenRenderProps = {
  close: (event?: React.MouseEvent) => void;
};

export type IDrawerProps = Pick<IPortalProps, 'root'> &
  IBaseProps<IDrawerStylesKey> & {
    isOpen?: boolean;
    disabled?: boolean;
    trigger?:
      | React.ReactNode
      | ((props: IDrawerTriggerRenderProps) => React.ReactElement);
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;

    anchor?: 'left' | 'right';
    variant?: IDrawerVariant;
    children:
      | ((renderProps: IDrawerChildrenRenderProps) => React.ReactNode)
      | React.ReactNode;
  };
