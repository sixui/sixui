import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  appLayoutAsideTheme,
  IAppLayoutAsideThemeFactory,
} from './AppLayoutAside.css';

export interface IAppLayoutAsideOwnProps
  extends IOmit<ISideSheetContentOwnProps, 'side'> {
  detached?: boolean;
  standardOpened?: boolean;
  modalOpened?: boolean;
  side?: 'left' | 'right';
  root?: HTMLElement | null;
}

export interface IAppLayoutAsideProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutAsideThemeFactory>,
    IAppLayoutAsideOwnProps {}

export type IAppLayoutAsideFactory = IComponentFactory<{
  props: IAppLayoutAsideProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutAsideTheme;
}>;
