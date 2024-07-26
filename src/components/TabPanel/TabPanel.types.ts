import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IContainerProps } from '~/helpers/types';
import type { ITabPanelStylesKey } from './TabPanel.styes';

export const TAB_PANEL_DEFAULT_TAG = 'div';

export type ITabPanelOwnProps = IContainerProps<ITabPanelStylesKey> & {
  anchor: string;
  children?: React.ReactNode;
};

export type ITabPanelProps<
  TRoot extends React.ElementType = typeof TAB_PANEL_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ITabPanelOwnProps>;
