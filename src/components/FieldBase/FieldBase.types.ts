import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
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
  textArea?: boolean;
  labelId?: string;
  loading?: boolean;
  tabIndex?: number;
  children?: IRendererWithForwardedProps;
  containerRef?: React.Ref<HTMLDivElement>;
}

export interface IFieldBaseProps
  extends IOmit<IBoxProps, 'children'>,
    IComponentThemeProps<IFieldBaseThemeFactory>,
    IFieldBaseOwnProps {}

export type IFieldBaseFactory = IPolymorphicComponentFactory<{
  props: IFieldBaseProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof fieldBaseTheme;
  variant: IFieldBaseVariant;
}>;
