import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  IPolymorphicTemplateThemeFactory,
  polymorphicTemplateTheme,
} from './PolymorphicTemplate.css';

export const polymorphicTemplateVariants = ['primary', 'secondary'] as const;
export type IPolymorphicTemplateVariant =
  (typeof polymorphicTemplateVariants)[number];

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
