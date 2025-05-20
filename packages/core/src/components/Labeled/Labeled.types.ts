import type { IBoxProps } from '~/components/Box';
import type { IFlexOwnProps } from '~/components/Flex';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/utils/react/forwardablePropsTypes';
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
    ILabeledContextValue,
    IForwardableProps {
  label?: React.ReactNode;
  trailingAction?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  children?: IRendererWithForwardedProps<ILabeledChildrenRenderProps>;
  labelPosition?: ISide;
  supportingTextPosition?: 'start' | 'end';
  readOnlyOnLoading?: boolean;
  errorTextPosition?: 'start' | 'end';
  withRequiredSign?: boolean;
  requiredSign?: React.ReactNode;
  unassociated?: boolean;
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
