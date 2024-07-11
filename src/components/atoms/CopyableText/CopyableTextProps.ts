import type { IContainerProps } from '@/helpers/types';
import type { IFluidButtonOwnProps } from '@/components/atoms/FluidButton';

export type ICopyableTextTriggerRenderProps = {
  copy: () => Promise<void>;
  disabled?: boolean;
};

export type ICopyableTextProps = IContainerProps &
  IFluidButtonOwnProps & {
    children?: React.ReactNode;
    text?: string;
    disabled?: boolean;
    copySupportingText?: string;
    copiedSupportingText?: string;
    icon?: React.ReactNode;
  };
