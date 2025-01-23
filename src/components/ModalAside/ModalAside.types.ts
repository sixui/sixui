import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  IModalAsideThemeFactory,
  modalAsideTheme,
} from './ModalAside.css';

export interface IModalAsideOwnProps extends ISideSheetContentOwnProps {
  opened?: boolean;
  detached?: boolean;
  root?: HTMLElement | null;
}

export interface IModalAsideProps
  extends IBoxProps,
    IComponentThemeProps<IModalAsideThemeFactory>,
    IModalAsideOwnProps {}

export type IModalAsideFactory = IComponentFactory<{
  props: IModalAsideProps;
  ref: HTMLDivElement;
  theme: typeof modalAsideTheme;
}>;
