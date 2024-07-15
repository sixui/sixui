import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '@/helpers/react/forwardablePropsTypes';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IContainerProps } from '@/helpers/types';
import type { IVisualState } from '@/components/VisualState';
import type { IFieldBaseStylesKey } from './FieldBase.styles';

export const FIELD_BASE_DEFAULT_TAG = 'div';

export type IFieldBaseVariant = 'filled' | 'outlined';

export type IFieldBaseOwnProps = IContainerProps<IFieldBaseStylesKey> &
  IForwardableProps & {
    visualState?: IVisualState;
    variant?: IFieldBaseVariant | false;
    count?: number;
    disabled?: boolean;
    readOnly?: boolean;
    hasError?: boolean;
    errorText?: string;
    start?: React.ReactNode;
    end?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    label?: string;
    max?: number | string;
    populated?: boolean;
    required?: boolean;
    resizable?: boolean;
    supportingText?: React.ReactNode;
    textArea?: boolean;
    labelId?: string;
    loading?: boolean;
    tabIndex?: number;
    children?: IRendererWithForwardedProps;
  };

export type IFieldBaseProps<
  TRoot extends React.ElementType = typeof FIELD_BASE_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IFieldBaseOwnProps>;
