import type { IBaseProps } from '../Base';
import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IVisualState } from '../VisualState';
import type { IFieldBaseStylesKey } from './FieldBase.styles';

export type IFieldBaseVariant = 'filled' | 'outlined';

export type IFieldBaseProps = IBaseProps<IFieldBaseStylesKey> &
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
    maxLength?: number;
    populated?: boolean;
    required?: boolean;
    resizable?: boolean;
    supportingText?: React.ReactNode;
    textArea?: boolean;
    labelId?: string;
    loading?: boolean;
    tabIndex?: number;
    children?: IRendererWithForwardedProps;
    containerRef?: React.Ref<HTMLDivElement>;
  };
