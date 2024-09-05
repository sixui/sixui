import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { focusRingTheme, IFocusRingThemeFactory } from './FocusRing.css';

export type IFocusRingVariant = 'inward' | 'outward';

export interface IFocusRingProps
  extends IBoxProps,
    IComponentThemeProps<IFocusRingThemeFactory> {}

export type IFocusRingFactory = IComponentFactory<{
  props: IFocusRingProps;
  ref: HTMLDivElement;
  theme: typeof focusRingTheme;
}>;
