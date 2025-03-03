import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  IPlaceholderThemeFactory,
  placeholderTheme,
} from './Placeholder.css';

export interface IPlaceholderOwnProps extends IPaperOwnProps {
  label?: React.ReactNode;
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
