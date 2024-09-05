import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  placeholderTheme,
  IPlaceholderThemeFactory,
} from './Placeholder.css';

export type IPlaceholderOwnProps = IPaperOwnProps & {
  label?: string;
  crosshairs?: boolean;
  disabled?: boolean;
};

export interface IPlaceholderProps
  extends IBoxProps,
    IStylesProps<IPlaceholderThemeFactory>,
    IPlaceholderOwnProps {}

export type IPlaceholderFactory = IPolymorphicComponentFactory<{
  props: IPlaceholderProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof placeholderTheme;
}>;
