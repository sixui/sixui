import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IPaperStyleKey, IPaperVariant } from './Paper.styledefs';
import type { IElevationStyleKey } from '@/components/utils/Elevation';

export type IPaperProps = IContainerProps<IPaperStyleKey> & {
  variant?: IPaperVariant | false;
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  children?: React.ReactNode;
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  square?: boolean;
};
