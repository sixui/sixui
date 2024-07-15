import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '@/helpers/types';
import type { ISnackbarContentStylesKey } from './SnackbarContent.styles';
import type { IElevationStylesKey } from '@/components/utils/Elevation';

export type ISnackbarContentProps =
  IContainerProps<ISnackbarContentStylesKey> & {
    innerStyles?: {
      elevation?: IZeroOrMore<ICompiledStyles<IElevationStylesKey>>;
    };
    children?: React.ReactNode;
    actionLabel?: string;
    onActionClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
    onClose?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
    showCloseButton?: boolean;
  };
