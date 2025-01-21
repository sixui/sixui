import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  ISideSheetContentOwnProps,
  ISideSheetContentVariant,
} from '../SideSheetContent';
import type {
  INavigationDrawerContentThemeFactory,
  navigationDrawerContentTheme,
} from './NavigationDrawerContent.css';

export type INavigationDrawerContentVariant = ISideSheetContentVariant;

export type INavigationDrawerContentOwnProps = ISideSheetContentOwnProps;

export interface INavigationDrawerContentProps
  extends IOmit<IBoxProps, 'children'>,
    IComponentThemeProps<INavigationDrawerContentThemeFactory>,
    INavigationDrawerContentOwnProps {}

export type INavigationDrawerContentFactory = IComponentFactory<{
  props: INavigationDrawerContentProps;
  ref: HTMLDivElement;
  theme: typeof navigationDrawerContentTheme;
}>;
