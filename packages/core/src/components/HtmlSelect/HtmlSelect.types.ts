import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  htmlSelectTheme,
  IHtmlSelectThemeFactory,
} from './HtmlSelect.css';
import type {
  HtmlSelectControl,
  IHtmlSelectControlOwnProps,
  IHtmlSelectControlProps,
} from './HtmlSelectControl';

export interface IHtmlSelectOwnProps
  extends IHtmlSelectControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'supportingText'
      | 'requiredSign'
      | 'hasError'
      | 'errorText'
      | 'loading'
      | 'readOnlyOnLoading'
    > {
  labeledProps?: ILabeledProps;
  controlProps?: IHtmlSelectControlProps;
}

export interface IHtmlSelectProps
  extends IBoxProps,
    IComponentThemeProps<IHtmlSelectThemeFactory>,
    IHtmlSelectOwnProps {}

export type IHtmlSelectFactory = IComponentFactory<{
  props: IHtmlSelectProps;
  ref: HTMLSelectElement;
  theme: typeof htmlSelectTheme;
  staticComponents: {
    Control: typeof HtmlSelectControl;
  };
}>;
