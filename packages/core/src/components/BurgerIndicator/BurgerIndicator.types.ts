import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  burgerIndicatorTheme,
  IBurgerIndicatorThemeFactory,
} from './BurgerIndicator.css';

export interface IBurgerIndicatorOwnProps {
  opened?: boolean;
}

export interface IBurgerIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IBurgerIndicatorThemeFactory>,
    IBurgerIndicatorOwnProps {}

export type IBurgerIndicatorFactory = IComponentFactory<{
  props: IBurgerIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof burgerIndicatorTheme;
}>;
