import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type {
  IComponentThemeProps,
  IThemeColorScheme,
  IThemeElevationLevel,
  IThemeOutlineSize,
  IThemeShapeCornerSize,
} from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IPaperThemeFactory, paperTheme } from './Paper.css';

export interface IPaperOwnProps extends IPaperBaseOwnProps {
  shape?: `$${IThemeShapeCornerSize}` | 'inherit';
  outline?: `$${IThemeOutlineSize}` | 'inherit';
  outlineStyle?: 'solid' | 'dashed' | 'dotted' | 'inherit';
  outlineColor?: `$${keyof IThemeColorScheme}` | 'inherit';
  elevation?: `$${IThemeElevationLevel}`;
  surface?: `$${keyof IThemeColorScheme | 'transparent'}`;
}

export interface IPaperProps
  extends IBoxProps,
    IComponentThemeProps<IPaperThemeFactory>,
    IPaperOwnProps {}

export type IPaperFactory = IPolymorphicComponentFactory<{
  props: IPaperProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof paperTheme;
}>;
