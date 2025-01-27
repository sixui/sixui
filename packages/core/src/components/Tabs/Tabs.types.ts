import type { IBoxProps } from '~/components/Box';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { ITabsContextValue } from './Tabs.context';
import type { basicTemplateTheme, ITabsThemeFactory } from './Tabs.css';
import type { TabsList } from './TabsList';
import type { TabsPanel } from './TabsPanel';
import type { TabsTab } from './TabsTab';

export interface ITabsOwnProps
  extends IOmit<ITabsContextValue, 'onTabActivated'> {
  children?: React.ReactNode;
  defaultAnchor?: string;
}

export interface ITabsProps
  extends IBoxProps,
    IComponentThemeProps<ITabsThemeFactory>,
    ITabsOwnProps {}

export type ITabsFactory = IComponentFactory<{
  props: ITabsProps;
  ref: HTMLDivElement;
  theme: typeof basicTemplateTheme;
  staticComponents: {
    List: typeof TabsList;
    Tab: typeof TabsTab;
    Panel: typeof TabsPanel;
  };
}>;
