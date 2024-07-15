import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type { IElevationStyleKey } from '@/components/utils/Elevation';
import type { IListProps } from '@/components/atoms/List';
import type { IMenuListStylesKey } from './MenuList.styles';

export type IMenuListProps = IContainerProps<IMenuListStylesKey> &
  IOmit<IListProps, 'styles'> & {
    innerStyles?: {
      list?: IZeroOrMore<ICompiledStyles<IMenuListStylesKey>>;
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    };
    children?: React.ReactNode;
  };
