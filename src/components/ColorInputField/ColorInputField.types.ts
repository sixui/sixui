import type { Placement } from '@floating-ui/react';

import type { IOmit, IOrientation } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { ITextInputFieldProps } from '../TextInputField';
import type { IColorInputFieldStylesKey } from './ColorInputField.styles';

export type IColorInputFieldColorPickerRendererProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>, color: string) => void;
  selectedColor?: string;
  customColors: Array<string>;
};

export type IColorInputFieldProps = IBaseProps<IColorInputFieldStylesKey> &
  IOmit<
    ITextInputFieldProps,
    'styles' | 'value' | 'defaultValue' | 'onChange'
  > & {
    placement?: Placement;
    transitionOrientation?: IOrientation;
    value?: string;
    defaultValue?: string;
    onChange?: (color: string) => void;
    colorPickerRenderer?: (
      props: IColorInputFieldColorPickerRendererProps,
    ) => JSX.Element;
    customColors?: Array<string>;
    onColorsQuantized?: (colors: Array<string>) => void;
    quantizeColorCount?: number;
  };
