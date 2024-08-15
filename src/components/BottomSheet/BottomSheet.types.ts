import type { OpenChangeReason, ReferenceType } from '@floating-ui/react';

import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type {
  IBottomSheetContentProps,
  IBottomSheetContentStylesKey,
} from '../BottomSheetContent';
import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { IBottomSheetStylesKey } from './BottomSheet.styles';

export type IBottomSheetTriggerRenderProps = {
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

export type IBottomSheetProps = Pick<IPortalProps, 'root'> &
  IBaseProps<IBottomSheetStylesKey> &
  IOmit<IBottomSheetContentProps, 'styles' | 'onClose' | 'variant'> & {
    innerStyles?: {
      bottomSheetContent?: IZeroOrMore<
        ICompiledStyles<IBottomSheetContentStylesKey>
      >;
    };
    isOpen?: boolean;
    disabled?: boolean;
    trigger?:
      | React.ReactNode
      | ((props: IBottomSheetTriggerRenderProps) => React.ReactElement);
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;

    modal?: boolean;
    minimized?: boolean;
  };
