import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type {
  IPaperBaseThemeFactory,
  paperBaseTheme,
} from '~/components/PaperBase/PaperBase.css';
import type {
  IComponentThemeProps,
  IThemeColorScheme,
  IThemeElevationLevel,
  IThemeOutlineSize,
  IThemeShapeCornerSize,
} from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';

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
    IComponentThemeProps<IPaperBaseThemeFactory>,
    IPaperOwnProps {}

export type IPaperFactory = IPolymorphicComponentFactory<{
  props: IPaperProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof paperBaseTheme;
}>;
