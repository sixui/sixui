import type { IContainerProps, IOrientation } from '@/helpers/types';
import type { IStepConnectorStyleKey } from './StepConnector.styledefs';

export type IStepConnectorProps = IContainerProps<IStepConnectorStyleKey> & {
  children?: React.ReactNode;
  orientation?: IOrientation;
  stepLabelPosition?: 'right' | 'bottom';
  textPosition?: 'top' | 'middle' | 'bottom';
};
