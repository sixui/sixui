import type { IBoxProps } from '~/components/Box';
import type { IIconButtonOwnProps } from '~/components/IconButton';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component';
import type { IOmit } from '~/utils/types';
import type { burgerTheme, IBurgerThemeFactory } from './Burger.css';
import type {
  BurgerIndicator,
  IBurgerIndicatorOwnProps,
} from './BurgerIndicator';

export interface IBurgerOwnProps
  extends IOmit<IIconButtonOwnProps, 'icon'>,
    IBurgerIndicatorOwnProps {}

export interface IBurgerProps
  extends IBoxProps,
    IComponentThemeProps<IBurgerThemeFactory>,
    IBurgerOwnProps {}

export type IBurgerFactory = IPolymorphicComponentFactory<{
  props: IBurgerProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof burgerTheme;
  staticComponents: {
    Indicator: typeof BurgerIndicator;
  };
}>;
