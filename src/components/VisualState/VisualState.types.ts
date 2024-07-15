import type { IVisualState } from './useVisualState';

export type IVisualStateProps = {
  visualState?: IVisualState;
  disabled?: boolean;
  children?: React.ReactNode;
};
