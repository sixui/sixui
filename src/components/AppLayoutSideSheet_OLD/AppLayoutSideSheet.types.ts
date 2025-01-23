import type { IHorizontalSide } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  appLayoutSideSheetTheme,
  IAppLayoutSideSheetThemeFactory,
} from './AppLayoutSideSheet.css';

export interface IAppLayoutSideSheetOwnProps {
  children?: React.ReactNode;
  hasHeader?: boolean;
  navigationRailOpened?: boolean;
  navigationDrawerOpened?: boolean;
  opened?: boolean;
  side: IHorizontalSide;
}

export interface IAppLayoutSideSheetProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutSideSheetThemeFactory>,
    IAppLayoutSideSheetOwnProps {}

export type IAppLayoutSideSheetFactory = IComponentFactory<{
  props: IAppLayoutSideSheetProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutSideSheetTheme;
}>;
