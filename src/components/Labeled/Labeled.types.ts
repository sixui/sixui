import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ILabeledContextValue } from './Labeled.context';
import type { ILabeledThemeFactory, labeledTheme } from './Labeled.css';

export type ILabeledRenderProps = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  loading?: boolean;
};

export interface ILabeledOwnProps extends ILabeledContextValue {
  label: React.ReactNode;
  trailingAction?: React.ReactNode;
  supportingText?: React.ReactNode;
  children?:
    | React.ReactNode
    | ((props: ILabeledRenderProps) => React.ReactNode);
  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  supportingTextPosition?: 'start' | 'end';
  errorTextPosition?: 'start' | 'end';
  requiredSign?: React.ReactNode;
}

export interface ILabeledProps
  extends IBoxProps,
    IComponentThemeProps<ILabeledThemeFactory>,
    ILabeledOwnProps {}

export type ILabeledFactory = IComponentFactory<{
  props: ILabeledProps;
  ref: HTMLDivElement;
  theme: typeof labeledTheme;
}>;
