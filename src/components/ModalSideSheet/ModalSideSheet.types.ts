import type { OpenChangeReason, ReferenceType } from '@floating-ui/react';

import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type {
  ISideSheetContentProps,
  ISideSheetContentStylesKey,
} from '../SideSheetContent';
import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { IModalSideSheetStylesKey } from './ModalSideSheet.styles';

export type IModalSideSheetVariant = 'standard' | 'detached';

export type IModalSideSheetTriggerRenderProps = {
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

export type IModalSideSheetProps = Pick<IPortalProps, 'root'> &
  IBaseProps<IModalSideSheetStylesKey> &
  IOmit<ISideSheetContentProps, 'styles' | 'onClose' | 'variant'> & {
    innerStyles?: {
      modalSideSheetContent?: IZeroOrMore<
        ICompiledStyles<ISideSheetContentStylesKey>
      >;
    };
    isOpen?: boolean;
    disabled?: boolean;
    trigger?:
      | React.ReactNode
      | ((props: IModalSideSheetTriggerRenderProps) => React.ReactElement);
    onOpenChange?: (
      open: boolean,
      event?: Event,
      reason?: OpenChangeReason,
    ) => void;

    anchor?: 'left' | 'right';
    variant?: IModalSideSheetVariant;
  };
