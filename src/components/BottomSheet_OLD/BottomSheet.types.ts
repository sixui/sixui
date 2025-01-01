import type { OpenChangeReason, ReferenceType } from '@floating-ui/react';

import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type {
  IBottomSheetContentProps,
  IBottomSheetContentStylesKey,
} from '../BottomSheetContent';
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

export type IBottomSheetProps = IBaseProps<IBottomSheetStylesKey> &
  Pick<IPortalProps, 'root'> &
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
