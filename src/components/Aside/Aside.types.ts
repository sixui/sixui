import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type { asideTheme, IAsideThemeFactory } from './Aside.css';

export interface IAsideOwnProps
  extends IOmit<ISideSheetContentOwnProps, 'side'> {
  detached?: boolean;
  standardOpened?: boolean;
  modalOpened?: boolean;
  side?: 'left' | 'right';
  root?: HTMLElement | null;
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
