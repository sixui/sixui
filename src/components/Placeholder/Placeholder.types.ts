import type { IComponentFactory } from '~/utils/componentFactory';
import type { IStylesProps } from '~/hooks/useStyles2';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  placeholderStyles,
  IPlaceholderStylesFactory,
} from './Placeholder.css';

export type IPlaceholderOwnProps = {
  label?: string;
  crosshairs?: boolean;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
};

export type IPlaceholderProps = IBoxProps &
  IStylesProps<IPlaceholderStylesFactory> &
  IPaperOwnProps &
  IPlaceholderOwnProps;

export type IPlaceholderFactory = IComponentFactory<{
  props: IPlaceholderProps;
  ref: HTMLDivElement;
  styles: typeof placeholderStyles;
}>;
