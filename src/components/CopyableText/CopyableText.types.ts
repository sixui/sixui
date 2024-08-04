import type {
  IZeroOrMore,
  ICompiledStyles,
  IContainerProps,
  IOmit,
} from '~/helpers/types';
import type { IFluidButtonProps, IFluidButtonStylesKey } from '../FluidButton';
import type { ICopyableTextStylesKey } from './CopyableText.styles';

export type ICopyableTextTriggerRenderProps = {
  copy: () => Promise<void>;
  disabled?: boolean;
};

export type ICopyableTextProps = IContainerProps<ICopyableTextStylesKey> &
  IOmit<IFluidButtonProps, 'styles'> & {
    innerStyles?: {
      fluidButton?: IZeroOrMore<ICompiledStyles<IFluidButtonStylesKey>>;
    };
    children?: React.ReactNode;
    text?: string;
    disabled?: boolean;
    copySupportingText?: string;
    copiedSupportingText?: string;
    icon?: React.ReactNode;
  };
