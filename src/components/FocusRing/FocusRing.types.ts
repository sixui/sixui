import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { focusRingStyles, IFocusRingStylesFactory } from './FocusRing.css';

export type IFocusRingVariant = 'inward' | 'outward';

export interface IFocusRingProps
  extends IBoxProps,
    IStylesProps<IFocusRingStylesFactory> {}

export type IFocusRingFactory = IComponentFactory<{
  props: IFocusRingProps;
  ref: HTMLDivElement;
  styles: typeof focusRingStyles;
}>;
