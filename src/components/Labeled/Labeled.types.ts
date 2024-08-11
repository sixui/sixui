import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IStackProps } from '../Stack';
import type { ILabeledStylesKey } from './Labeled.styles';
import type { ILabeledContextValue } from './Labeled.context';

export type ILabeledRenderProps = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  loading?: boolean;
};

export type ILabeledProps = IBaseProps<ILabeledStylesKey> &
  IOmit<IStackProps, 'styles' | 'children'> &
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
    requiredSign?: React.ReactNode;
  };
