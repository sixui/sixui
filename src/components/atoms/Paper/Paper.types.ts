import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IPaperStylesKey } from './Paper.styles';
import type { IElevationStyleKey } from '@/components/utils/Elevation';

export type IPaperVariant = 'filled' | 'outlined';

export type IPaperProps = IContainerProps<IPaperStylesKey> & {
  variant?: IPaperVariant | false;
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  children?: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  square?: boolean;
};
