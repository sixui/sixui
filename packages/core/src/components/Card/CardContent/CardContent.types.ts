import type { IBoxProps } from '~/components/Box';
import type { IFlexOwnProps } from '~/components/Flex';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  CardContentTheme,
  ICardContentThemeFactory,
} from './CardContent.css';

export interface ICardContentOwnProps extends IFlexOwnProps {
  children?: React.ReactNode;
}

export interface ICardContentProps
  extends IBoxProps,
    IComponentThemeProps<ICardContentThemeFactory>,
    ICardContentOwnProps {}

export type ICardContentFactory = IPolymorphicComponentFactory<{
  props: ICardContentProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof CardContentTheme;
}>;
