import type { IOrientation } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  dividerTheme,
  IStepConnectorThemeFactory,
} from './StepConnector.css';

export type IStepConnectorOwnProps = {
  children?: React.ReactNode;
  orientation?: IOrientation;
  stepLabelPosition?: 'right' | 'bottom';
  textPosition?: 'top' | 'middle' | 'bottom';
};

export interface IStepConnectorProps
  extends IBoxProps,
    IComponentThemeProps<IStepConnectorThemeFactory>,
    IStepConnectorOwnProps {}

export type IStepConnectorFactory = IComponentFactory<{
  props: IStepConnectorProps;
  ref: HTMLDivElement;
  theme: typeof dividerTheme;
}>;
