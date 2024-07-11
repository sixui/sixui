import type { IContainerProps } from '@/helpers/types';
import type { IVisualState } from '@/components/utils/VisualState';
import type { IFocusRingStyleKey } from './FocusRing.styledefs';

export type IFocusRingProps = IContainerProps<IFocusRingStyleKey> & {
  visualState?: IVisualState;
  for?: React.RefObject<HTMLElement>;
  inward?: boolean;
};
