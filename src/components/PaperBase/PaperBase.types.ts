import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '~/helpers/types';
import type { IPaperBaseStylesKey } from './PaperBase.styles';
import type { IElevationStylesKey } from '~/components/Elevation';

export type IPaperBaseVariant = 'filled' | 'elevated' | 'outlined';

export type IPaperBaseProps = IContainerProps<IPaperBaseStylesKey> & {
  variant?: IPaperBaseVariant | false;
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
  };
  children?: React.ReactNode;
};
