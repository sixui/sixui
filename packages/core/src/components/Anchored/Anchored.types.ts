import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { anchoredTheme, IAnchoredThemeFactory } from './Anchored.css';

type IVerticalPosition = 'top' | 'middle' | 'bottom';

type IHorizontalPosition = 'start' | 'center' | 'end';

export type IAnchorPosition = `${IVerticalPosition}-${IHorizontalPosition}`;

export type IAnchorOverlap = 'rectangular' | 'circular';

export interface IAnchoredOwnProps {
  position?: IAnchorPosition;
  overlap?: IAnchorOverlap;
  content?: React.ReactNode;
  invisible?: boolean;
  offsetX?: string | number;
  offsetY?: string | number;
  children: React.ReactNode;
}

export interface IAnchoredProps
  extends IBoxProps,
    IComponentThemeProps<IAnchoredThemeFactory>,
    IAnchoredOwnProps {}

export type IAnchoredFactory = IComponentFactory<{
  props: IAnchoredProps;
  ref: HTMLDivElement;
  theme: typeof anchoredTheme;
}>;
