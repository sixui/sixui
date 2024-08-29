import type { IZeroOrMore, ICompiledStyles } from '~/helpers/types';
import type { IElevationStylesKey } from '../Elevation';
import type { IBoxProps } from '../Box';
import type { IPaperBaseStylesKey } from './PaperBase.styles';

export type IPaperBaseProps = IBoxProps<IBoxClassName> &
  React.ComponentPropsWithoutRef<'div'> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
    };
    children?: React.ReactNode;
  };
