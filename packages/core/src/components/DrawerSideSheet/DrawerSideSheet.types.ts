import type { IBoxProps } from '~/components/Box';
import type { IDrawerAsideOwnProps } from '~/components/DrawerAside';
import type { ISideSheetContentOwnProps } from '~/components/SideSheetContent';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type {
  drawerSideSheetTheme,
  IDrawerSideSheetThemeFactory,
} from './DrawerSideSheet.css';

export interface IDrawerSideSheetOwnProps
  extends IOmit<IDrawerAsideOwnProps, 'children' | 'side'>,
    ISideSheetContentOwnProps {
  side?: IHorizontalSide;
}

export interface IDrawerSideSheetProps
  extends IBoxProps,
    IComponentThemeProps<IDrawerSideSheetThemeFactory>,
    IDrawerSideSheetOwnProps {}

export type IDrawerSideSheetFactory = IComponentFactory<{
  props: IDrawerSideSheetProps;
  ref: HTMLDivElement;
  theme: typeof drawerSideSheetTheme;
}>;
