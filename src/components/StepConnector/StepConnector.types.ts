import type { IOrientation } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IStepConnectorStylesKey } from './StepConnector.styles';

export type IStepConnectorProps = IBaseProps<IStepConnectorStylesKey> & {
  children?: React.ReactNode;
  orientation?: IOrientation;
  stepLabelPosition?: 'right' | 'bottom';
  textPosition?: 'top' | 'middle' | 'bottom';
};
