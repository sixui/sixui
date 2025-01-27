import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { ITabsPanelThemeFactory, tabsPanelTheme } from './TabsPanel.css';

export interface ITabsPanelOwnProps {
  children?: React.ReactNode;
  anchor: string;
}

export interface ITabsPanelProps
  extends IBoxProps,
    IComponentThemeProps<ITabsPanelThemeFactory>,
    ITabsPanelOwnProps {}

export type ITabsPanelFactory = IComponentFactory<{
  props: ITabsPanelProps;
  ref: HTMLDivElement;
  theme: typeof tabsPanelTheme;
}>;
