import type { IContainerProps } from '~/helpers/types';
import type { IVisualState } from '~/components/VisualState';
import type { IFocusRingStylesKey } from './FocusRing.styles';

export type IFocusRingProps = IContainerProps<IFocusRingStylesKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  inward?: boolean;
};
