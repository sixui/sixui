import type {
  IColor,
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
import type { IColorTagStylesKey } from '@/components/ColorTag';
import type { IColorButtonStylesKey } from './ColorButton.styles';

export const COLOR_BUTTON_DEFAULT_TAG = 'button';

export type IColorButtonOwnProps = IContainerProps<IColorButtonStylesKey> &
  IOmit<IButtonBaseOwnProps, 'styles'> & {
    innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
      buttonBase?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
      colorTag?: IZeroOrMore<ICompiledStyles<IColorTagStylesKey>>;
    };
    children?: React.ReactNode;
    selected?: boolean;
    backgroundColor?: IColor;
    foregroundColor?: IColor;
  };

export type IColorButtonProps<
  TRoot extends React.ElementType = typeof COLOR_BUTTON_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IColorButtonOwnProps>;
