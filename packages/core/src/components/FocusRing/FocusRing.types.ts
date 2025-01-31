import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
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
