import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '~/helpers/types';
import type { IPaperBaseStylesKey } from './PaperBase.styles';
import type { IElevationStylesKey } from '~/components/Elevation';

export type IPaperBaseProps = IContainerProps<IPaperBaseStylesKey> &
  React.ComponentPropsWithoutRef<'div'> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
    };
    children?: React.ReactNode;
  };
