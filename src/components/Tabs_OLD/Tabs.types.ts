import type { IAny, IMaybeAsync, IOmit } from '~/helpers/types';
import type { ITabsContextValue } from './Tabs.context';

export type ITabsProps = IOmit<
  ITabsContextValue,
  'onChange' | 'onTabActivated'
> & {
  onChange?: (anchor: string | undefined) => IMaybeAsync<IAny>;
  defaultAnchor?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};
