import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IPlainTooltipContentOwnProps,
  IPlainTooltipContentProps,
} from '../PlainTooltipContent';
import type { IPlainTooltipContentThemeFactory } from '../PlainTooltipContent/PlainTooltipContent.css';
import type { IPopoverBaseOwnProps } from '../PopoverBase';
import type { plainTooltipTheme } from './PlainTooltip.css';

export interface IPlainTooltipOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IPlainTooltipContentOwnProps {
  /** Contains the props for all slots within the component. */
  slotProps?: IPopoverBaseOwnProps['slotProps'] & {
    plainTooltipContent?: Partial<IPlainTooltipContentProps>;
  };

  children: React.ReactNode;
}

export interface IPlainTooltipProps
  extends IBoxProps,
    IComponentThemeProps<IPlainTooltipContentThemeFactory>,
    IPlainTooltipOwnProps {}

export type IPlainTooltipFactory = IComponentFactory<{
  props: IPlainTooltipProps;
  ref: HTMLDivElement;
  theme: typeof plainTooltipTheme;
}>;
