import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { badgeTheme, IBadgeThemeFactory } from './Badge.css';

export interface IBadgeOwnProps extends IPaperOwnProps {
  value?: string | number;
  maxValue?: number;
  showZero?: boolean;
  dot?: boolean;
}

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
