import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps, IElementProps } from '../Box';
import type { IFieldBaseOwnProps } from '../FieldBase';
import type {
  htmlSelectTheme,
  IHtmlSelectThemeFactory,
} from './HtmlSelect.css';

export interface IHtmlSelectOption {
  value: string | number;
  label?: string;
}

export interface IHtmlSelectOwnProps
  extends IFieldBaseOwnProps,
    IElementProps<'select', 'className' | 'children' | 'multiple'> {
  /**
   * Shorthand for supplying options: an array of basic types or objects with
   * `value` and `label`. If no `label` is supplied, `value` will be used as the
   * label.
   */
  items: ReadonlyArray<string | number | IHtmlSelectOption>;

  /**
   * Multiple select is not supported.
   */
  multiple?: never;

  children?: React.ReactNode;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IHtmlSelectProps
  extends IBoxProps,
    IComponentThemeProps<IHtmlSelectThemeFactory>,
    IHtmlSelectOwnProps {}

export type IHtmlSelectFactory = IComponentFactory<{
  props: IHtmlSelectProps;
  ref: HTMLSelectElement;
  theme: typeof htmlSelectTheme;
}>;
