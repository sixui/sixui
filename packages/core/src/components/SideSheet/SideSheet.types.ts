import type { IAsideOwnProps } from '~/components/Aside';
import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type { ISideSheetThemeFactory, sideSheetTheme } from './SideSheet.css';
import type { ISideSheetContentOwnProps } from './SideSheetContent';

export interface ISideSheetOwnProps
  extends IOmit<IAsideOwnProps, 'children' | 'side'>,
    ISideSheetContentOwnProps {
  side?: IHorizontalSide;
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
