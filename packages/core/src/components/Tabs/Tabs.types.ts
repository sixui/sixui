import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type { ITabsContextValue } from './Tabs.context';
import type { TabsList } from './TabsList';
import type { TabsPanel } from './TabsPanel';
import type { TabsTab } from './TabsTab';

export interface ITabsOwnProps
  extends IOmit<ITabsContextValue, 'onTabActivated'> {
  children?: React.ReactNode;
  defaultAnchor?: string;
}

export interface ITabsProps extends IBoxProps, ITabsOwnProps {}

export type ITabsFactory = IComponentFactory<{
  props: ITabsProps;
  ref: HTMLDivElement;
  staticComponents: {
    List: typeof TabsList;
    Tab: typeof TabsTab;
    Panel: typeof TabsPanel;
  };
}>;
