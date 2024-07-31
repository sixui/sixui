import type { IContainerProps } from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
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

export type ILabeledOwnProps = IContainerProps<ILabeledStylesKey> &
  ILabeledContextValue & {
    label?: React.ReactNode;
    action?: React.ReactNode;
    supportingText?: React.ReactNode;
    children?:
      | React.ReactNode
      | ((props: ILabeledRenderProps) => React.ReactNode);
    labelPosition?: 'top' | 'bottom' | 'left' | 'right';
    supportingTextPosition?: 'start' | 'end';
  };

export type ILabeledProps<TRoot extends React.ElementType> =
  IPolymorphicComponentPropsWithRef<TRoot, ILabeledOwnProps>;
