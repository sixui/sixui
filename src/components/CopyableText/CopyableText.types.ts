import type {
  IZeroOrMore,
  ICompiledStyles,
  IContainerProps,
  IOmit,
} from '~/helpers/types';
import type {
  IFluidButtonOwnProps,
  IFluidButtonStylesKey,
} from '~/components/FluidButton';
import type { ICopyableTextStylesKey } from './CopyableText.styles';

export type ICopyableTextTriggerRenderProps = {
  copy: () => Promise<void>;
  disabled?: boolean;
};

export type ICopyableTextProps = IContainerProps<ICopyableTextStylesKey> &
  IOmit<IFluidButtonOwnProps, 'styles'> & {
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
