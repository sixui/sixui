import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ILabeledContextValue } from './Labeled.context';
import type { ILabeledThemeFactory, labeledTheme } from './Labeled.css';
import { ISide } from '~/utils/types';

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
  labelPosition?: ISide;
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
