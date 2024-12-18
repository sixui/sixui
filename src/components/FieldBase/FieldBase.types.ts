import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperProps } from '../Paper';
import type { fieldBaseTheme, IFieldBaseThemeFactory } from './FieldBase.css';

export type IFieldBaseVariant = 'filled' | 'outlined';

export interface IFieldBaseOwnProps extends IForwardableProps {
  count?: number;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  errorText?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  prefixText?: React.ReactNode;
  suffixText?: React.ReactNode;
  label?: string;
  max?: number | string;
  maxLength?: number;
  populated?: boolean;
  required?: boolean;
  resizable?: boolean;
  supportingText?: React.ReactNode;
  multiline?: boolean;
  loading?: boolean;
  children?: IRendererWithForwardedProps;
  containerRef?: React.Ref<HTMLDivElement>;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  withoutRippleEffect?: boolean;
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  containerProps?: Partial<IPaperProps>;
  managedFocus?: boolean;
}

export interface IFieldBaseProps
  extends IBoxProps,
    IComponentThemeProps<IFieldBaseThemeFactory>,
    IFieldBaseOwnProps {}

export type IFieldBaseFactory = IPolymorphicComponentFactory<{
  props: IFieldBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof fieldBaseTheme;
  variant: IFieldBaseVariant;
}>;
