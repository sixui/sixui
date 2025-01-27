import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type {
  IThemeColorScheme,
  IThemeElevationLevel,
  IThemeOutlineSize,
  IThemeShapeCornerSize,
} from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IPaperThemeFactory, paperTheme } from './Paper.css';

export interface IPaperOwnProps extends IPaperBaseOwnProps {
  shape?: `$${IThemeShapeCornerSize}`;
  outline?: `$${IThemeOutlineSize}`;
  outlineStyle?: 'solid' | 'dashed' | 'dotted';
  outlineColor?: `$${keyof IThemeColorScheme}`;
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
