import type { Placement } from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IColorInputFieldStylesKey } from './ColorInputField.styles';
import type { ITextInputFieldProps } from '@/components/TextInputField';

export type IColorInputFieldProps = IContainerProps<IColorInputFieldStylesKey> &
  IOmit<ITextInputFieldProps, 'styles'> & {
    placement?: Placement;
    value?: string;
    defaultValue?: string;
  };
