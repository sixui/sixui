import type { IBoxProps } from '~/components/Box';
import type { IPopoverBaseOwnProps } from '~/components/PopoverBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
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
