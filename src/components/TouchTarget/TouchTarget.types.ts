import type { ITouchTargetStylesKey } from './TouchTarget.styles';
import type { IBaseProps } from '../Base';
import type { IVisualState } from '../VisualState';

export type ITouchTargetProps = IBaseProps<ITouchTargetStylesKey> & {
  visualState?: IVisualState;
  disabled?: boolean;
  children?: React.ReactNode;
};
