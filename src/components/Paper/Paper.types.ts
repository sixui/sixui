import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '~/helpers/types';
import type {
  IPaperBaseProps,
  IPaperBaseStylesKey,
} from '~/components/PaperBase';
import type { IColorScheme } from '~/themes/base';

export type IPaperVariant = 'filled' | 'outlined';

export type IPaperElevation = 0 | 1 | 2 | 3 | 4 | 5;

export type IPaperCorner = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type IPaperColor = keyof IColorScheme;

export type IPaperCornerPosition =
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft';

export type IPaperProps = IContainerProps &
  IOmit<IPaperBaseProps, 'styles' | 'innerStyles'> & {
    innerStyles?: IPaperBaseProps['innerStyles'] & {
      paperBase?: IZeroOrMore<ICompiledStyles<IPaperBaseStylesKey>>;
    };
    elevation?: IPaperElevation;
    corner?: IPaperCorner | Partial<Record<IPaperCornerPosition, IPaperCorner>>;
    surface?: IPaperColor;
    outlined?: boolean;
  };
