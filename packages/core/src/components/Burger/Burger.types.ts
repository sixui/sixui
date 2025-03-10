import type { IBoxProps } from '~/components/Box';
import type { IIconButtonOwnProps } from '~/components/IconButton';
import type {
  iconButtonTheme,
  IIconButtonThemeFactory,
} from '~/components/IconButton/IconButton.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component';
import type { IOmit } from '~/utils/types';
import type {
  BurgerIndicator,
  IBurgerIndicatorOwnProps,
} from './BurgerIndicator';

export interface IBurgerOwnProps
  extends IOmit<IIconButtonOwnProps, 'icon'>,
    IBurgerIndicatorOwnProps {}

export interface IBurgerProps
  extends IBoxProps,
    IComponentThemeProps<IIconButtonThemeFactory>,
    IBurgerOwnProps {}

export type IBurgerFactory = IPolymorphicComponentFactory<{
  props: IBurgerProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof iconButtonTheme;
  staticComponents: {
    Indicator: typeof BurgerIndicator;
  };
}>;
