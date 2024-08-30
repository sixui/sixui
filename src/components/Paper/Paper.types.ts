import type { IPolymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import type { IStylesProps } from '~/hooks/useStyles2';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  IThemeColorScheme,
  IThemeElevationLevel,
  IThemeShapeCornerSize,
} from '../ThemeProvider';
import type { IBoxProps } from '../Box';
import type { paperStyles, IPaperStylesFactory } from './Paper.css';

export type IPaperVariant = 'filled' | 'outlined';

export type IPaperCornerPosition =
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft';

export type IPaperProps = IBoxProps &
  IStylesProps<IPaperStylesFactory> &
  IPaperBaseOwnProps & {
    elevation?: IThemeElevationLevel;
    corner?:
      | IThemeShapeCornerSize
      | Partial<Record<IPaperCornerPosition, IThemeShapeCornerSize>>;
    surface?: keyof IThemeColorScheme;
    outlined?: boolean;
  };

export type IPaperFactory = IPolymorphicComponentFactory<{
  props: IPaperProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof paperStyles;
}>;
