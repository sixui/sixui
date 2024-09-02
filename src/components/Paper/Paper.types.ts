import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type { IBoxProps } from '../Box';
import type {
  paperStyles,
  IPaperStylesFactory,
  IPaperSprinkles,
  IPaperBackgroundSprinkles,
  IPaperElevationSprinkles,
  IPaperOutlineSprinkles,
} from './Paper.css';

export type IPaperVariant = 'filled' | 'outlined';

export interface IPaperOwnProps
  extends IPaperBaseOwnProps,
    IPaperSprinkles,
    IPaperBackgroundSprinkles,
    IPaperElevationSprinkles,
    IPaperOutlineSprinkles {}

export type IPaperProps = IBoxProps &
  IStylesProps<IPaperStylesFactory> &
  IPaperOwnProps;

export type IPaperFactory = IPolymorphicComponentFactory<{
  props: IPaperProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof paperStyles;
}>;
