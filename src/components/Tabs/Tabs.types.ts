import type { IAny, IOmit, IMaybeAsync } from '~/helpers/types';
import type { ITabContextValue } from './TabContext';

export type ITabsProps = IOmit<
  ITabContextValue,
  'onChange' | 'onTabActivated'
> & {
  onChange?: (anchor: string | undefined) => IMaybeAsync<IAny>;
  defaultAnchor?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};
