import type { IBoxProps } from '~/components/Box';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { flexTheme, IFlexSprinkles, IFlexThemeFactory } from './Flex.css';

export interface IFlexOwnProps extends IFlexSprinkles {
  children?: React.ReactNode;
  divider?: React.ReactNode;
}

export interface IFlexProps
  extends IBoxProps,
    IComponentThemeProps<IFlexThemeFactory>,
    IFlexOwnProps {}

export type IFlexFactory = IPolymorphicComponentFactory<{
  props: IFlexProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof flexTheme;
}>;
