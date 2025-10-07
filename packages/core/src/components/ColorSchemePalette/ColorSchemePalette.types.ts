import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  colorSchemePaletteTheme,
  IColorSchemePaletteThemeFactory,
} from './ColorSchemePalette.css';
import { ColorSchemePaletteColor } from './ColorSchemePaletteColor';

export interface IColorSchemePaletteProps
  extends IBoxProps,
    IComponentThemeProps<IColorSchemePaletteThemeFactory> {}

export type IColorSchemePaletteFactory = IComponentFactory<{
  props: IColorSchemePaletteProps;
  ref: HTMLDivElement;
  theme: typeof colorSchemePaletteTheme;
  staticComponents: {
    Role: typeof ColorSchemePaletteColor;
  };
}>;
