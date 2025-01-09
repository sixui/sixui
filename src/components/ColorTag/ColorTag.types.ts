import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type { colorTagTheme, IColorTagThemeFactory } from './ColorTag.css';

export interface IColorTagOwnProps extends IPaperBaseOwnProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  backgroundColor?: string;
  foregroundColor?: string;
}

export interface IColorTagProps
  extends IBoxProps,
    IComponentThemeProps<IColorTagThemeFactory>,
    IColorTagOwnProps {}

export type IColorTagFactory = IPolymorphicComponentFactory<{
  props: IColorTagProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof colorTagTheme;
}>;
