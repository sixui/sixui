import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type { asideTheme, IAsideThemeFactory } from './Aside.css';

export interface IAsideOwnProps extends ISideSheetContentOwnProps {
  detached?: boolean;
  standardOpened?: boolean;
  modalOpened?: boolean;
  root?: HTMLElement | null;
  modalRef?: React.RefObject<HTMLDivElement>;
}

export interface IAsideProps
  extends IBoxProps,
    IComponentThemeProps<IAsideThemeFactory>,
    IAsideOwnProps {}

export type IAsideFactory = IComponentFactory<{
  props: IAsideProps;
  ref: HTMLDivElement;
  theme: typeof asideTheme;
}>;
