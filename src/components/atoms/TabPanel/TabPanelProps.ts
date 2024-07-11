import type { IContainerProps, IOmit } from '@/helpers/types';

export type ITabPanelProps = IOmit<IContainerProps, 'styles'> & {
  anchor: string;
  children?: React.ReactNode;
};
