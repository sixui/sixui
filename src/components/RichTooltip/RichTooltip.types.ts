import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPopoverBaseOwnProps } from '../PopoverBase';
import type {
  IRichTooltipContentOwnProps,
  IRichTooltipContentProps,
} from '../RichTooltipContent';
import type { IRichTooltipContentThemeFactory } from '../RichTooltipContent/RichTooltipContent.css';
import type { richTooltipTheme } from './RichTooltip.css';

export interface IRichTooltipOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IRichTooltipContentOwnProps {
  /** Contains the props for all slots within the component. */
  slotProps?: IPopoverBaseOwnProps['slotProps'] & {
    richTooltipContent?: Partial<IRichTooltipContentProps>;
  };

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
