import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  IThemeColorScheme,
  IThemeElevationLevel,
  IThemeOutlineSize,
  IThemeShapeCornerSize,
} from '../ThemeProvider';
import type { IPaperThemeFactory, paperTheme } from './Paper.css';

export interface IPaperOwnProps extends IPaperBaseOwnProps {
  shape?: `$${IThemeShapeCornerSize}`;
  outline?: `$${IThemeOutlineSize}`;
  outlineStyle?: 'solid' | 'dashed' | 'dotted';
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
