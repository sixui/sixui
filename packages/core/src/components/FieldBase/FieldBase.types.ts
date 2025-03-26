import type { IBoxProps } from '~/components/Box';
import type { IPaperProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/utils/react/forwardablePropsTypes';
import type { fieldBaseTheme, IFieldBaseThemeFactory } from './FieldBase.css';
import type { FieldBaseSkeleton } from './FieldBaseSkeleton';

export const fieldBaseVariants = ['filled', 'outlined'] as const;
export type IFieldBaseVariant = (typeof fieldBaseVariants)[number];

export interface IFieldBaseOwnProps extends IForwardableProps {
  count?: number;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  errorText?: React.ReactNode;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  prefixText?: React.ReactNode;
  suffixText?: React.ReactNode;
  label?: React.ReactNode;
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
  staticComponents: {
    Skeleton: typeof FieldBaseSkeleton;
  };
}>;
