import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '~/helpers/types';
import type { IElevationStylesKey } from '../Elevation';
import type { IListProps } from '../List';
import type { IMenuListStylesKey } from './MenuList.styles';

export type IMenuListProps = IContainerProps<IMenuListStylesKey> &
  IOmit<IListProps, 'styles'> & {
    innerStyles?: {
      list?: IZeroOrMore<ICompiledStyles<IMenuListStylesKey>>;
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
    };
    children?: React.ReactNode;
  };
