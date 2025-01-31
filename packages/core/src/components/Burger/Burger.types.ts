import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { burgerTheme, IBurgerThemeFactory } from './Burger.css';

export interface IBurgerOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IBurgerProps
  extends IBoxProps,
    IComponentThemeProps<IBurgerThemeFactory>,
    IBurgerOwnProps {}

export type IBurgerFactory = IComponentFactory<{
  props: IBurgerProps;
  ref: HTMLDivElement;
  theme: typeof burgerTheme;
}>;
