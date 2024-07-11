import type { IContainerProps, IOrientation } from '@/helpers/types';
import type { IElementWithLabelStyleKey } from './ElementWithLabel.styledefs';

export type IElementWithLabelRenderProps = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
};

export type IElementWithLabelProps =
  IContainerProps<IElementWithLabelStyleKey> & {
    id?: string;
    label?: React.ReactNode;
    action?: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    supportingText?: React.ReactNode;
    errorText?: React.ReactNode;
    children:
      | React.ReactNode
      | ((props: IElementWithLabelRenderProps) => React.ReactNode);
    hasError?: boolean;
    orientation?: IOrientation;
    labelPosition?: 'start' | 'end';
    supportingTextPosition?: 'start' | 'end';
  };
