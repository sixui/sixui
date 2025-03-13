import type { IBoxProps } from '~/components/Box';
import type { IFlexOwnProps } from '~/components/Flex';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit, ISide } from '~/utils/types';
import type { ILabeledContextValue } from './Labeled.context';
import type { ILabeledThemeFactory, labeledTheme } from './Labeled.css';

export type ILabeledChildrenRenderProps = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hasError?: boolean;
  loading?: boolean;
};

export interface ILabeledOwnProps
  extends IOmit<IFlexOwnProps, 'children'>,
    ILabeledContextValue {
  label?: React.ReactNode;
  trailingAction?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  children?:
    | React.ReactNode
    | ((props: ILabeledChildrenRenderProps) => React.ReactNode);
  labelPosition?: ISide;
  supportingTextPosition?: 'start' | 'end';
  readOnlyOnLoading?: boolean;
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
