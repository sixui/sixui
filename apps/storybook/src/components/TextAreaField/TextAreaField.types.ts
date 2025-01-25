import type { IBoxProps } from '~/components/Box';
import type { IFieldBaseOwnProps } from '~/components/FieldBase';
import type { IElementProps, IMaybeAsync } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  ITextAreaFieldThemeFactory,
  textAreaFieldTheme,
} from './TextAreaField.css';

export interface ITextAreaFieldOwnProps
  extends IFieldBaseOwnProps,
    IElementProps<'textarea', 'className' | 'children' | 'onChange'> {
  /**
   * When true, a clear icon button will appear on the right side of the input.
   */
  clearable?: boolean;

  /**
   * The icon of the clear icon button.
   */
  clearIcon?: React.ReactNode;

  children?: React.ReactNode;
  rootRef?: React.Ref<HTMLDivElement>;

  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => IMaybeAsync<unknown>;
}

export interface ITextAreaFieldProps
  extends IBoxProps,
    IComponentThemeProps<ITextAreaFieldThemeFactory>,
    ITextAreaFieldOwnProps {}

export type ITextAreaFieldFactory = IComponentFactory<{
  props: ITextAreaFieldProps;
  ref: HTMLTextAreaElement;
  theme: typeof textAreaFieldTheme;
}>;
