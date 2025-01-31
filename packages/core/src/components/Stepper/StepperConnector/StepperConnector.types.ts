import type { IBoxProps } from '~/components/Box';
import type { IDividerOwnProps } from '~/components/Divider';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  dividerTheme,
  IStepperConnectorThemeFactory,
} from './StepperConnector.css';

export interface IStepperConnectorOwnProps extends IDividerOwnProps {
  stepLabelPosition?: 'right' | 'bottom';
}

export interface IStepperConnectorProps
  extends IBoxProps,
    IComponentThemeProps<IStepperConnectorThemeFactory>,
    IStepperConnectorOwnProps {}

export type IStepperConnectorFactory = IComponentFactory<{
  props: IStepperConnectorProps;
  ref: HTMLDivElement;
  theme: typeof dividerTheme;
}>;
