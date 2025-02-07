import type { IBoxProps } from '~/components/Box';
import type { ISideSheetOwnProps } from '~/components/SideSheet';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutSideSheetTheme,
  IAppLayoutSideSheetThemeFactory,
} from './AppLayoutSideSheet.css';

export type IAppLayoutSideSheetOwnProps = ISideSheetOwnProps;

export interface IAppLayoutSideSheetProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutSideSheetThemeFactory>,
    IAppLayoutSideSheetOwnProps {}

export type IAppLayoutSideSheetFactory = IComponentFactory<{
  props: IAppLayoutSideSheetProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutSideSheetTheme;
}>;
