import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { anchoredStyles, IAnchoredStylesFactory } from './Anchored.css';

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

export type IAnchoredOwnProps = {
  position?: IAnchorPosition;
  overlap?: 'rectangular' | 'circular';
  children: React.ReactNode;
  content?: React.ReactNode;
  invisible?: boolean;
  offsetX?: string | number;
  offsetY?: string | number;
};

export interface IAnchoredProps
  extends IBoxProps,
    IStylesProps<IAnchoredStylesFactory>,
    IAnchoredOwnProps {}

export type IAnchoredFactory = IComponentFactory<{
  props: IAnchoredProps;
  ref: HTMLDivElement;
  styles: typeof anchoredStyles;
}>;
