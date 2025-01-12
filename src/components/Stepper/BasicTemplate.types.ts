import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  basicTemplateTheme,
  IBasicTemplateThemeFactory,
} from './BasicTemplate.css';

export interface IBasicTemplateOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IBasicTemplateProps
  extends IBoxProps,
    IComponentThemeProps<IBasicTemplateThemeFactory>,
    IBasicTemplateOwnProps {}

export type IBasicTemplateFactory = IComponentFactory<{
  props: IBasicTemplateProps;
  ref: HTMLDivElement;
  theme: typeof basicTemplateTheme;
}>;
