import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  IPlainTooltipContentThemeFactory,
  plainTooltipContentTheme,
} from './PlainTooltipContent.css';

export interface IPlainTooltipContentOwnProps extends IPaperOwnProps {
  supportingText: React.ReactNode;
  renderCursor?: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
}

export interface IPlainTooltipContentProps
  extends IBoxProps,
    IComponentThemeProps<IPlainTooltipContentThemeFactory>,
    IPlainTooltipContentOwnProps {}

export type IPlainTooltipContentFactory = IComponentFactory<{
  props: IPlainTooltipContentProps;
  ref: HTMLDivElement;
  theme: typeof plainTooltipContentTheme;
}>;
