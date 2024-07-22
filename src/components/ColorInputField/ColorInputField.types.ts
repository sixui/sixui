import type { Placement } from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IColorInputFieldStylesKey } from './ColorInputField.styles';
import type { ITextInputFieldProps } from '@/components/TextInputField';

export type IColorInputFieldColorPickerRendererProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>, color: string) => void;
  selectedColor?: string;
};

export type IColorInputFieldProps = IContainerProps<IColorInputFieldStylesKey> &
  IOmit<ITextInputFieldProps, 'styles' | 'value' | 'defaultValue'> & {
    placement?: Placement;
    value?: string;
    defaultValue?: string;
    onChange?: (color?: string) => void;
    colorPickerRenderer?: (
      props: IColorInputFieldColorPickerRendererProps,
    ) => JSX.Element;
  };