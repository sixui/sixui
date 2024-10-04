import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { focusRingTheme, IFocusRingThemeFactory } from './FocusRing.css';

export type IFocusRingVariant = 'outward' | 'inward';

export interface IFocusRingOwnProps {
  visible?: boolean;
}

export interface IFocusRingProps
  extends IBoxProps,
    IComponentThemeProps<IFocusRingThemeFactory>,
    IFocusRingOwnProps {}

export type IFocusRingFactory = IComponentFactory<{
  props: IFocusRingProps;
  ref: HTMLDivElement;
  theme: typeof focusRingTheme;
}>;
