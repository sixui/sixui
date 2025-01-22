import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  IStandardSideSheetThemeFactory,
  standardSideSheetTheme,
} from './StandardSideSheet.css';

export interface IStandardSideSheetOwnProps
  extends IOmit<ISideSheetContentOwnProps, 'side'> {
  opened?: boolean;
  side?: 'left' | 'right';
  onClose?: () => void;
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
