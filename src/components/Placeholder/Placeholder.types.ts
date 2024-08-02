import type { IContainerProps, IOmit } from '~/helpers/types';
import type { IPlaceholderStylesKey } from './Placeholder.styles';
import type { IPaperProps } from '~/components/Paper';

export type IPlaceholderProps = IContainerProps<IPlaceholderStylesKey> &
  IOmit<IPaperProps, 'styles'> & {
    innerStyles?: IPaperProps['innerStyles'];
    crosshairs?: boolean;
  };
