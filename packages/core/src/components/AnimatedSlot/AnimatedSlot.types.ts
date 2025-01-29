import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  animatedSlotTheme,
  IAnimatedSlotThemeFactory,
} from './AnimatedSlot.css';

export interface IAnimatedSlotOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  opened?: boolean;
  loading?: boolean;
}

export interface IAnimatedSlotProps
  extends IBoxProps,
    IComponentThemeProps<IAnimatedSlotThemeFactory>,
    IAnimatedSlotOwnProps {}

export type IAnimatedSlotFactory = IComponentFactory<{
  props: IAnimatedSlotProps;
  ref: HTMLDivElement;
  theme: typeof animatedSlotTheme;
}>;
