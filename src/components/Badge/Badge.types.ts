import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { badgeTheme, IBadgeThemeFactory } from './Badge.css';

export type IBadgeOwnProps = {
  value?: string | number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
};

export interface IBadgeProps
  extends IBoxProps,
    IComponentThemeProps<IBadgeThemeFactory>,
    IBadgeOwnProps {}

export type IBadgeFactory = IPolymorphicComponentFactory<{
  props: IBadgeProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof badgeTheme;
}>;
