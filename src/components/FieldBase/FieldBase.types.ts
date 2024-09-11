import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { fieldBaseTheme, IFieldBaseThemeFactory } from './FieldBase.css';

export type IFieldBaseVariant = 'filled' | 'outlined';

export interface IFieldBaseOwnProps
  extends IOmit<IButtonBaseOwnProps, 'children'>,
    IForwardableProps {
  count?: number;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  errorText?: React.ReactNode;
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
  multiline?: boolean;
  loading?: boolean;
  placeholder?: React.ReactNode;
  children?: IRendererWithForwardedProps;
  containerRef?: React.Ref<HTMLDivElement>;
}

export interface IFieldBaseProps
  extends IOmit<IBoxProps, 'children'>,
    IComponentThemeProps<IFieldBaseThemeFactory>,
    IFieldBaseOwnProps {}

export type IFieldBaseFactory = IComponentFactory<{
  props: IFieldBaseProps;
  ref: HTMLDivElement;
  theme: typeof fieldBaseTheme;
  variant: IFieldBaseVariant;
}>;
