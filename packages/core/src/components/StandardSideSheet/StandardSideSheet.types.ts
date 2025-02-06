import type { IBoxProps } from '~/components/Box';
import type { ISideSheetContentOwnProps } from '~/components/SideSheetContent';
import type { IStandardAsideOwnProps } from '~/components/StandardAside';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type {
  IStandardSideSheetThemeFactory,
  standardSideSheetTheme,
} from './StandardSideSheet.css';

export interface IStandardSideSheetOwnProps
  extends IOmit<IStandardAsideOwnProps, 'children' | 'side'>,
    ISideSheetContentOwnProps {
  side?: IHorizontalSide;
}

export interface IStandardSideSheetProps
  extends IBoxProps,
    IComponentThemeProps<IStandardSideSheetThemeFactory>,
    IStandardSideSheetOwnProps {}

export type IStandardSideSheetFactory = IComponentFactory<{
  props: IStandardSideSheetProps;
  ref: HTMLDivElement;
  theme: typeof standardSideSheetTheme;
}>;
