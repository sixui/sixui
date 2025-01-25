import type { IBoxProps } from '~/components/Box';
import type { IButtonBaseOwnProps } from '~/components/ButtonBase';
import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { colorTagTheme, IColorTagThemeFactory } from './ColorTag.css';
import type {
  ColorTagIndicator,
  IColorTagIndicatorOwnProps,
} from './ColorTagIndicator';

export interface IColorTagOwnProps
  extends IOmit<IButtonBaseOwnProps, 'children'>,
    IColorTagIndicatorOwnProps {
  selected?: boolean;
  loading?: boolean;
}

export interface IColorTagProps
  extends IBoxProps,
    IComponentThemeProps<IColorTagThemeFactory>,
    IColorTagOwnProps {}

export type IColorTagFactory = IPolymorphicComponentFactory<{
  props: IColorTagProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof colorTagTheme;
  staticComponents: {
    Indicator: typeof ColorTagIndicator;
  };
}>;
