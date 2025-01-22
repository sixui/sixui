import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  IStandardSideSheetThemeFactory,
  standardSideSheetTheme,
} from './StandardSideSheet.css';

export interface IStandardSideSheetOwnProps extends ISideSheetContentOwnProps {
  opened?: boolean;
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
