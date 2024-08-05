import type { IBaseProps } from '../Base';
import type { IVisualState } from '../VisualState';
import type { IFocusRingStylesKey } from './FocusRing.styles';

export type IFocusRingProps = IBaseProps<IFocusRingStylesKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  inward?: boolean;
};
