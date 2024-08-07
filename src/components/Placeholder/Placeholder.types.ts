import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IPlaceholderStylesKey } from './Placeholder.styles';
import type { IPaperProps } from '../Paper';

export type IPlaceholderProps = IBaseProps<IPlaceholderStylesKey> &
  IOmit<IPaperProps, 'styles'> & {
    label?: string;
    innerStyles?: IPaperProps['innerStyles'];
    crosshairs?: boolean;
    disabled?: boolean;
  };
