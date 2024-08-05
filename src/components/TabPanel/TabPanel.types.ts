import type { IBaseProps } from '../Base';

export type ITabPanelProps = IBaseProps & {
  anchor: string;
  children?: React.ReactNode;
};
