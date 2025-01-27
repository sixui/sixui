import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  IPlaceholderThemeFactory,
  placeholderTheme,
} from './Placeholder.css';

export interface IPlaceholderOwnProps extends IPaperOwnProps {
  label?: string;
  diagonals?: boolean;
  disabled?: boolean;
}

export interface IPlaceholderProps
  extends IBoxProps,
    IComponentThemeProps<IPlaceholderThemeFactory>,
    IPlaceholderOwnProps {}

export type IPlaceholderFactory = IPolymorphicComponentFactory<{
  props: IPlaceholderProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof placeholderTheme;
}>;
