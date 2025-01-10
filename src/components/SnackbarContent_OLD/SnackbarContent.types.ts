import type {
  IAny,
  ICompiledStyles,
  IMaybeAsync,
  IZeroOrMore,
} from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IElevationStylesKey } from '../Elevation';
import type { ISnackbarContentStylesKey } from './SnackbarContent.styles';

export type ISnackbarContentProps = IBaseProps<ISnackbarContentStylesKey> & {
  innerStyles?: {
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
  };
  children?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: (
    event: React.MouseEvent<HTMLElement>,
  ) => IMaybeAsync<unknown>;
  onClose?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<unknown>;
  showCloseButton?: boolean;
};
