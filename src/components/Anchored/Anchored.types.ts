import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { anchoredTheme, IAnchoredThemeFactory } from './Anchored.css';

export type IAnchorPosition =
  | 'bottom-end'
  | 'bottom-start'
  | 'top-end'
  | 'top-start'
  | 'bottom-center'
  | 'top-center'
  | 'middle-center'
  | 'middle-end'
  | 'middle-start';

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
