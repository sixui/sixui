import type { IBaseProps } from '../Base';
import type { ILabeledStylesKey } from './Labeled.styles';
import type { ILabeledContextValue } from './LabeledContext';

export type ILabeledRenderProps = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  softDisabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  loading?: boolean;
};

export type ILabeledProps = IBaseProps<ILabeledStylesKey> &
  ILabeledContextValue & {
    label: React.ReactNode;
    trailingAction?: React.ReactNode;
    supportingText?: React.ReactNode;
    children?:
      | React.ReactNode
      | ((props: ILabeledRenderProps) => React.ReactNode);
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
    supportingTextPosition?: 'start' | 'end';
    errorTextPosition?: 'start' | 'end';
  };
