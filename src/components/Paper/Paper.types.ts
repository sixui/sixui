import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type { IBoxProps } from '../Box';
import type {
  paperTheme,
  IPaperThemeFactory,
  IPaperSprinkles,
  IPaperBackgroundSprinkles,
  IPaperElevationSprinkles,
  IPaperOutlineSprinkles,
} from './Paper.css';

export interface IPaperOwnProps
  extends IPaperBaseOwnProps,
    IPaperSprinkles,
    IPaperBackgroundSprinkles,
    IPaperElevationSprinkles,
    IPaperOutlineSprinkles {}

export interface IPaperProps
  extends IBoxProps,
    IStylesProps<IPaperThemeFactory>,
    IPaperOwnProps {}

export type IPaperFactory = IPolymorphicComponentFactory<{
  props: IPaperProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof paperTheme;
}>;
