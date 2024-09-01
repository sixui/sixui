import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  placeholderStyles,
  IPlaceholderStylesFactory,
} from './Placeholder.css';

export type IPlaceholderOwnProps = IPaperOwnProps & {
  label?: string;
  crosshairs?: boolean;
  disabled?: boolean;
  width?: string | number;
  height?: string | number;
};

export type IPlaceholderProps = IBoxProps &
  IStylesProps<IPlaceholderStylesFactory> &
  IPlaceholderOwnProps;

export type IPlaceholderFactory = IPolymorphicComponentFactory<{
  props: IPlaceholderProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof placeholderStyles;
}>;
