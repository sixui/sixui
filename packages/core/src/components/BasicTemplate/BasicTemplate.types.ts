import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  basicTemplateTheme,
  IBasicTemplateThemeFactory,
} from './BasicTemplate.css';

export interface IBasicTemplateOwnProps extends IPaperOwnProps {
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
