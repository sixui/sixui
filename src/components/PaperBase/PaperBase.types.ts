import type { IZeroOrMore, ICompiledStyles } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IElevationStylesKey } from '../Elevation';
import type { IPaperBaseStylesKey } from './PaperBase.styles';

export type IPaperBaseProps = IBaseProps<IPaperBaseStylesKey> &
  React.ComponentPropsWithoutRef<'div'> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
    };
    children?: React.ReactNode;
  };
