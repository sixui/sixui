import type { IContainerProps } from '@/helpers/types';
import type { ITabPanelStylesKey } from './TabPanel.styes';

export type ITabPanelProps = IContainerProps<ITabPanelStylesKey> & {
  anchor: string;
  children?: React.ReactNode;
};
