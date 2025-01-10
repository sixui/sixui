import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  ISnackbarContentThemeFactory,
  snackbarContentTheme,
} from './SnackbarContent.css';
import { IMaybeAsync } from '~/helpers/types';

export interface ISnackbarContentOwnProps extends IPaperBaseOwnProps {
  children?: React.ReactNode;
  actionLabel?: string;
  onActionClick?: () => IMaybeAsync<unknown>;
  onClose?: (event: React.MouseEvent<Element>) => IMaybeAsync<unknown>;
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
