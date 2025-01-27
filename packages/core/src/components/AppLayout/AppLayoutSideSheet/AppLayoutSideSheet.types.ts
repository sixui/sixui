import type { IBoxProps } from '~/components/Box';
import type { ISideSheetOwnProps } from '~/components/SideSheet';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  appLayoutSideSheetTheme,
  IAppLayoutSideSheetThemeFactory,
} from './AppLayoutSideSheet.css';

export interface IAppLayoutSideSheetOwnProps extends ISideSheetOwnProps {
  hasHeader?: boolean;
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
