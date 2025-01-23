import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ISideSheetContentOwnProps } from '../SideSheetContent';
import type {
  IStandardAsideThemeFactory,
  standardAsideTheme,
} from './StandardAside.css';

export interface IStandardAsideOwnProps extends ISideSheetContentOwnProps {
  opened?: boolean;
}

export interface IStandardAsideProps
  extends IBoxProps,
    IComponentThemeProps<IStandardAsideThemeFactory>,
    IStandardAsideOwnProps {}

export type IStandardAsideFactory = IComponentFactory<{
  props: IStandardAsideProps;
  ref: HTMLDivElement;
  theme: typeof standardAsideTheme;
}>;
