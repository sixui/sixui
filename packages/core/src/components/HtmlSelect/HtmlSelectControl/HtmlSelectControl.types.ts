import type { IBoxProps } from '~/components/Box';
import type { IFieldBaseOwnProps } from '~/components/FieldBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IElementProps } from '~/utils/types';
import type {
  htmlSelectControlTheme,
  IHtmlSelectControlThemeFactory,
} from './HtmlSelectControl.css';

export interface IHtmlSelectControlOption {
  value: string | number;
  label?: string;
}

export interface IHtmlSelectControlOwnProps
  extends IFieldBaseOwnProps,
    IElementProps<'select', 'className' | 'children' | 'multiple'> {
  /**
   * Shorthand for supplying options: an array of basic types or objects with
   * `value` and `label`. If no `label` is supplied, `value` will be used as the
   * label.
   */
  items: ReadonlyArray<string | number | IHtmlSelectControlOption>;

  /**
   * Multiple select is not supported.
   */
  multiple?: never;

  children?: React.ReactNode;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IHtmlSelectControlProps
  extends IBoxProps,
    IComponentThemeProps<IHtmlSelectControlThemeFactory>,
    IHtmlSelectControlOwnProps {}

export type IHtmlSelectControlFactory = IComponentFactory<{
  props: IHtmlSelectControlProps;
  ref: HTMLSelectElement;
  theme: typeof htmlSelectControlTheme;
}>;
