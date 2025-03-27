import type { IBoxProps } from '~/components/Box';
import type {
  FieldBaseSkeleton,
  IFieldBaseOwnProps,
} from '~/components/FieldBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IElementProps } from '~/utils/types';
import type {
  INativeSelectControlThemeFactory,
  nativeSelectControlTheme,
} from './NativeSelectControl.css';

export interface INativeSelectControlOption {
  value: string | number;
  label?: string;
}

export interface INativeSelectControlOwnProps
  extends IFieldBaseOwnProps,
    IElementProps<'select', 'className' | 'children' | 'multiple'> {
  /**
   * Shorthand for supplying options: an array of basic types or objects with
   * `value` and `label`. If no `label` is supplied, `value` will be used as the
   * label.
   */
  items: ReadonlyArray<string | number | INativeSelectControlOption>;

  /**
   * Multiple select is not supported.
   */
  multiple?: never;

  children?: React.ReactNode;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface INativeSelectControlProps
  extends IBoxProps,
    IComponentThemeProps<INativeSelectControlThemeFactory>,
    INativeSelectControlOwnProps {}

export type INativeSelectControlFactory = IComponentFactory<{
  props: INativeSelectControlProps;
  ref: HTMLSelectElement;
  theme: typeof nativeSelectControlTheme;
  staticComponents: {
    Skeleton: typeof FieldBaseSkeleton;
  };
}>;
