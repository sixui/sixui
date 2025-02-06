import type { IBoxProps } from '~/components/Box';
import type { IDrawerAsideOwnProps } from '~/components/DrawerAside';
import type { IStandardAsideOwnProps } from '~/components/StandardAside';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type { ISideSheetThemeFactory, sideSheetTheme } from './SideSheet.css';
import type { ISideSheetContentOwnProps } from './SideSheetContent';

export interface ISideSheetOwnProps
  extends IOmit<IStandardAsideOwnProps, 'children' | 'side'>,
    IOmit<IDrawerAsideOwnProps, 'children' | 'side'>,
    ISideSheetContentOwnProps {
  side?: IHorizontalSide;
  drawer?: boolean;
  drawerRef?: React.RefObject<HTMLDivElement>;
}

export interface ISideSheetProps
  extends IBoxProps,
    IComponentThemeProps<ISideSheetThemeFactory>,
    ISideSheetOwnProps {}

export type ISideSheetFactory = IComponentFactory<{
  props: ISideSheetProps;
  ref: HTMLDivElement;
  theme: typeof sideSheetTheme;
}>;
