import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IListProps } from '@/components/atoms/List';
import type { IMenuListStyleKey } from './MenuList.styledefs';

export type IMenuListProps = IContainerProps<IMenuListStyleKey> &
  IOmit<IListProps, 'styles'> & {
    innerStyles?: {
      list?: IZeroOrMore<ICompiledStyles<IMenuListStyleKey>>;
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    };
    children?: React.ReactNode;
  };
