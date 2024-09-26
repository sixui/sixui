import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IPlainTooltipContentThemeFactory,
  plainTooltipContentTheme,
} from './PlainTooltipContent.css';

export type IPlainTooltipContentOwnProps = {
  supportingText: React.ReactNode;
  renderCursor?: (
    userProps?: React.HTMLAttributes<SVGSVGElement>,
  ) => React.ReactNode;
};

export interface IPlainTooltipContentProps
  extends IBoxProps,
    IComponentThemeProps<IPlainTooltipContentThemeFactory>,
    IPlainTooltipContentOwnProps {}

export type IPlainTooltipContentFactory = IComponentFactory<{
  props: IPlainTooltipContentProps;
  ref: HTMLDivElement;
  theme: typeof plainTooltipContentTheme;
}>;
