import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../../Box';
import type {
  polymorphicTemplateTheme,
  IBasicTemplateThemeFactory,
} from './BasicTemplate.css';

export type IBasicTemplateVariant = 'primary';

export interface IBasicTemplateOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IBasicTemplateProps
  extends IBoxProps,
    IComponentThemeProps<IBasicTemplateThemeFactory>,
    IBasicTemplateOwnProps,
    IBasicTemplateOwnProps {}

export type IBasicTemplateFactory = IComponentFactory<{
  props: IBasicTemplateProps;
  ref: HTMLDivElement;
  theme: typeof polymorphicTemplateTheme;
  variant: IBasicTemplateVariant | false;
}>;
