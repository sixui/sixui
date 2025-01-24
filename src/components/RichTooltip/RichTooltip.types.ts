import type { IBoxProps } from '~/components/Box';
import type { IPopoverBaseOwnProps } from '~/components/PopoverBase';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { richTooltipTheme } from './RichTooltip.css';
import type {
  IRichTooltipContentOwnProps,
  IRichTooltipContentProps,
} from './RichTooltipContent';
import type { IRichTooltipContentThemeFactory } from './RichTooltipContent/RichTooltipContent.css';

export interface IRichTooltipOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IRichTooltipContentOwnProps {
  richTooltipContentProps?: Partial<IRichTooltipContentProps>;
  persistent?: boolean;
  children: React.ReactNode;
}

export interface IRichTooltipProps
  extends IBoxProps,
    IComponentThemeProps<IRichTooltipContentThemeFactory>,
    IRichTooltipOwnProps {}

export type IRichTooltipFactory = IComponentFactory<{
  props: IRichTooltipProps;
  ref: HTMLDivElement;
  theme: typeof richTooltipTheme;
}>;
