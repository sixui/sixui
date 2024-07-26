import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '~/helpers/types';
import type { IPaperBaseStylesKey } from '~/components/PaperBase';
import type { IPaperStylesKey } from './Paper.styles';

export type IPaperVariant = 'filled' | 'outlined';

export type IPaperProps = IContainerProps<IPaperStylesKey> & {
  innerStyles?: {
    paperBase?: IZeroOrMore<ICompiledStyles<IPaperBaseStylesKey>>;
  };
  children?: React.ReactNode;
  elevation?: 1 | 2 | 3 | 4 | 5;
  corner?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  surface?:
    | 'lowest'
    | 'low'
    | 'medium'
    | 'high'
    | 'highest'
    | 'inverse'
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'error';
  outlined?: boolean;
};
