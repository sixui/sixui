import type { IBoxProps } from '~/components/Box';
import type { IPopoverBaseOwnProps } from '~/components/PopoverBase';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { plainTooltipTheme } from './PlainTooltip.css';
import type {
  IPlainTooltipContentOwnProps,
  IPlainTooltipContentProps,
} from './PlainTooltipContent';
import type { IPlainTooltipContentThemeFactory } from './PlainTooltipContent/PlainTooltipContent.css';

export interface IPlainTooltipOwnProps
  extends IOmit<IPopoverBaseOwnProps, 'children' | 'contentRenderer'>,
    IPlainTooltipContentOwnProps {
  plainTooltipContentProps?: Partial<IPlainTooltipContentProps>;
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
