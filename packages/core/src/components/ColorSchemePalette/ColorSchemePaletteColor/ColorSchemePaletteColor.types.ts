import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  colorSchemeRoleTheme,
  IColorSchemePaletteColorThemeFactory,
} from './ColorSchemePaletteColor.css';

export type IColorSchemePaletteColorSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IColorSchemePaletteColorOwnProps extends IPaperOwnProps {
  label?: React.ReactNode;
  size?: IColorSchemePaletteColorSize;
}

export interface IColorSchemePaletteColorProps
  extends IBoxProps,
    IComponentThemeProps<IColorSchemePaletteColorThemeFactory>,
    IColorSchemePaletteColorOwnProps {}

export type IColorSchemePaletteColorFactory = IComponentFactory<{
  props: IColorSchemePaletteColorProps;
  ref: HTMLDivElement;
  theme: typeof colorSchemeRoleTheme;
}>;
