import type { IAsideOwnProps } from '~/components/Aside';
import type { IBoxProps } from '~/components/Box';
import type { IHorizontalSide, IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  ISideSheetThemeFactory,
  navigationDrawerTheme,
} from './SideSheet.css';
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
  theme: typeof navigationDrawerTheme;
}>;
