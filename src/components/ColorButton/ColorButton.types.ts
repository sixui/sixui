import type {
  ICompiledStyles,
  IContainerProps,
  IOmit,
  IZeroOrMore,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type {
  IButtonBaseOwnProps,
  IButtonBaseStylesKey,
} from '@/components/ButtonBase';
import type { IColorButtonStylesKey } from './ColorButton.styles';

export const FLUID_BUTTON_DEFAULT_TAG = 'button';

export type IColorButtonOwnProps = IContainerProps<IColorButtonStylesKey> &
  IOmit<IButtonBaseOwnProps, 'styles'> & {
    innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
      buttonBase?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
    };
    children?: React.ReactNode;
    selected?: boolean;
    backgroundColorHex?: string;
    foregroundColorHex?: string;
  };

export type IColorButtonProps<
  TRoot extends React.ElementType = typeof FLUID_BUTTON_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IColorButtonOwnProps>;
