import type { OpenChangeReason, ReferenceType } from '@floating-ui/react';

import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type {
  ISideSheetContentProps,
  ISideSheetContentStylesKey,
} from '../SideSheetContent';
import type { IBaseProps } from '../Base';
import type { ISideSheetStylesKey } from './SideSheet.styles';

export type ISideSheetVariant = 'standard' | 'detached';

export type ISideSheetTriggerRenderProps = {
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

export type ISideSheetProps = IBaseProps<ISideSheetStylesKey> &
  IOmit<ISideSheetContentProps, 'styles' | 'onClose' | 'variant'> & {
    innerStyles?: {
      sideSheetContent?: IZeroOrMore<
        ICompiledStyles<ISideSheetContentStylesKey>
      >;
    };
    isOpen?: boolean;
    disabled?: boolean;
    trigger?:
      | React.ReactNode
      | ((props: ISideSheetTriggerRenderProps) => React.ReactElement);
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;

    placement?: 'left' | 'right';
    modal?: boolean;
    variant?: ISideSheetVariant;
  };
