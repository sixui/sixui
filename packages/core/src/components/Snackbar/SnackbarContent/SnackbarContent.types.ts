import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  ISnackbarContentThemeFactory,
  snackbarContentTheme,
} from './SnackbarContent.css';
import { IMaybeAsync } from '~/utils/types';

export interface ISnackbarContentOwnProps extends IPaperBaseOwnProps {
  children?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: () => IMaybeAsync<unknown>;
  onClose?: () => IMaybeAsync<unknown>;
  onAfterClose?: () => IMaybeAsync<unknown>;
  showCloseButton?: boolean;
}

export interface ISnackbarContentProps
  extends IBoxProps,
    IComponentThemeProps<ISnackbarContentThemeFactory>,
    ISnackbarContentOwnProps {}

export type ISnackbarContentFactory = IComponentFactory<{
  props: ISnackbarContentProps;
  ref: HTMLDivElement;
  theme: typeof snackbarContentTheme;
}>;
