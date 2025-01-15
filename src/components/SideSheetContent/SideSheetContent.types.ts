import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  ISideSheetContentThemeFactory,
  sideSheetContentTheme,
} from './SideSheetContent.css';

export interface ISideSheetContentOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ISideSheetContentProps
  extends IBoxProps,
    IComponentThemeProps<ISideSheetContentThemeFactory>,
    ISideSheetContentOwnProps {}

export type ISideSheetContentFactory = IComponentFactory<{
  props: ISideSheetContentProps;
  ref: HTMLDivElement;
  theme: typeof sideSheetContentTheme;
}>;
