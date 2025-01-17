import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type { appHeaderTheme, IAppHeaderThemeFactory } from './AppHeader.css';

export interface IAppHeaderOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  divider?: boolean;
}

export interface IAppHeaderProps
  extends IBoxProps,
    IComponentThemeProps<IAppHeaderThemeFactory>,
    IAppHeaderOwnProps {}

export type IAppHeaderFactory = IComponentFactory<{
  props: IAppHeaderProps;
  ref: HTMLDivElement;
  theme: typeof appHeaderTheme;
}>;
