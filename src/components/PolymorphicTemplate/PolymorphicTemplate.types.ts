import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  IPolymorphicTemplateThemeFactory,
  polymorphicTemplateTheme,
} from './PolymorphicTemplate.css';

export type IPolymorphicTemplateVariant = 'primary' | 'secondary';

export interface IPolymorphicTemplateOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IPolymorphicTemplateProps
  extends IBoxProps,
    IComponentThemeProps<IPolymorphicTemplateThemeFactory>,
    IPolymorphicTemplateOwnProps {}

export type IPolymorphicTemplateFactory = IPolymorphicComponentFactory<{
  props: IPolymorphicTemplateProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof polymorphicTemplateTheme;
  variant: IPolymorphicTemplateVariant | false;
}>;
