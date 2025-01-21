import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  appLayoutFooterTheme,
  IAppLayoutFooterThemeFactory,
} from './AppLayoutFooter.css';

export interface IAppLayoutFooterOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  divider?: boolean;
}

export interface IAppLayoutFooterProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutFooterThemeFactory>,
    IAppLayoutFooterOwnProps {}

export type IAppLayoutFooterFactory = IComponentFactory<{
  props: IAppLayoutFooterProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutFooterTheme;
}>;
