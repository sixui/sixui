import type { IContainerProps, IOrientation } from '@/helpers/types';
import type { IStepConnectorStylesKey } from './StepConnector.styles';

export type IStepConnectorProps = IContainerProps<IStepConnectorStylesKey> & {
  children?: React.ReactNode;
  orientation?: IOrientation;
  stepLabelPosition?: 'right' | 'bottom';
  textPosition?: 'top' | 'middle' | 'bottom';
};
