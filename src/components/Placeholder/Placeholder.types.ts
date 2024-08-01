import type {
  ICompiledStyles,
  IContainerProps,
  IOmit,
  IZeroOrMore,
} from '~/helpers/types';
import type { IPlaceholderStylesKey } from './Placeholder.styles';
import type { IPaperProps, IPaperStylesKey } from '~/components/Paper';

export type IPlaceholderProps = IContainerProps<IPlaceholderStylesKey> &
  IOmit<IPaperProps, 'styles'> & {
    innerStyles?: IPaperProps['innerStyles'] & {
      paper?: IZeroOrMore<ICompiledStyles<IPaperStylesKey>>;
    };
    label?: string;
    crosshairs?: boolean;
  };
