import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { basicTemplateTheme, ITabsThemeFactory } from './Tabs.css';

export interface ITabsOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ITabsProps
  extends IBoxProps,
    IComponentThemeProps<ITabsThemeFactory>,
    ITabsOwnProps {}

export type ITabsFactory = IComponentFactory<{
  props: ITabsProps;
  ref: HTMLDivElement;
  theme: typeof basicTemplateTheme;
}>;
