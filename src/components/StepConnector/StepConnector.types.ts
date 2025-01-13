import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IDividerOwnProps } from '../Divider';
import type {
  dividerTheme,
  IStepConnectorThemeFactory,
} from './StepConnector.css';

export interface IStepConnectorOwnProps extends IDividerOwnProps {
  labelPosition?: 'right' | 'bottom';
}

export interface IStepConnectorProps
  extends IBoxProps,
    IComponentThemeProps<IStepConnectorThemeFactory>,
    IStepConnectorOwnProps {}

export type IStepConnectorFactory = IComponentFactory<{
  props: IStepConnectorProps;
  ref: HTMLDivElement;
  theme: typeof dividerTheme;
}>;
