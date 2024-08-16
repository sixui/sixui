import type { OpenChangeReason, ReferenceType } from '@floating-ui/react';

import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type {
  ISideSheetContentProps,
  ISideSheetContentStylesKey,
} from '../SideSheetContent';
import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { ISideSheetStylesKey } from './SideSheet.styles';

export type ISideSheetVariant = 'standard' | 'detached';

export type ISideSheetTriggerRenderProps = {
  /**
   * Whether the bottom sheet is open.
   */
  opened: boolean;

  /**
   * A callback to set the trigger element.
   */
  setRef: ((node: ReferenceType | null) => void) | null;

  /**
   * A function that returns the props to apply to the trigger element.
   */
  getProps: () => Record<string, unknown>;
};

export type ISideSheetProps = Pick<IPortalProps, 'root'> &
  IBaseProps<ISideSheetStylesKey> &
  IOmit<ISideSheetContentProps, 'styles' | 'onClose' | 'variant'> & {
    innerStyles?: {
      sideSheetContent?: IZeroOrMore<
        ICompiledStyles<ISideSheetContentStylesKey>
      >;
    };
    opened?: boolean;
    disabled?: boolean;
    trigger?:
      | React.ReactNode
      | ((props: ISideSheetTriggerRenderProps) => React.ReactElement);
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;

    anchor?: 'left' | 'right';
    modal?: boolean;
    variant?: ISideSheetVariant;
  };
