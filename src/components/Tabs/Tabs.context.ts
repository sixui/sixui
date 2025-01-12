import type { ITabVariant } from '../Tab/Tab.types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

export interface ITabsContextValue {
  id?: string;
  anchor?: string;
  onTabActivated: (activeTab: HTMLElement, indicator: HTMLElement) => void;
  onChange?: (anchor: string | undefined) => unknown;
  variant?: ITabVariant | false;
  disabled?: boolean;
}

export const [TabsContextProvider, useTabsContext] =
  createOptionalContext<ITabsContextValue>();
