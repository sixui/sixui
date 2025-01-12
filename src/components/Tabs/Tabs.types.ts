import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { Tab } from '../Tab';
import type { TabList } from '../TabList';
import type { TabPanel } from '../TabPanel';
import type { ITabsContextValue } from './Tabs.context';
import type { basicTemplateTheme, ITabsThemeFactory } from './Tabs.css';

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
    Tab: typeof Tab;
    TabList: typeof TabList;
    TabPanel: typeof TabPanel;
  };
}>;
