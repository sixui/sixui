import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ITabPanelThemeFactory, tabPanelTheme } from './TabPanel.css';

export interface ITabPanelOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ITabPanelProps
  extends IBoxProps,
    IComponentThemeProps<ITabPanelThemeFactory>,
    ITabPanelOwnProps {}

export type ITabPanelFactory = IComponentFactory<{
  props: ITabPanelProps;
  ref: HTMLDivElement;
  theme: typeof tabPanelTheme;
}>;
