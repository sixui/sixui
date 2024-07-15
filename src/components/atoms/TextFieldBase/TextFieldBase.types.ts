import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type {
  IFieldBaseOwnProps,
  IFieldBaseStylesKey,
} from '@/components/atoms/FieldBase';
import type { ITextFieldBaseStylesKey } from './TextFieldBase.styles';
import type { IStyleProps } from '@/helpers/stylePropsFactory';
import type { IControlledValueProps } from '@/hooks/useControlledValue';
import type {
  IRendererWithForwardedProps,
  IForwardableProps,
} from '@/helpers/react/forwardablePropsTypes';

export type ITextFieldBaseModifiers = {
  /**
   * When true, the text field will have an error state.
   */
  hasError?: boolean;

  /**
   * When true, the text field will be non-interactive.
   */
  disabled?: boolean;
};

export type ITextFieldBaseRenderProps<
  TElement extends HTMLElement,
  TChildrenProps extends object,
> = {
  // FIXME: refactor (remove never)
  sxf: IStyleProps<ITextFieldBaseStylesKey, never>;
  ref: React.RefObject<TElement> | React.RefCallback<TElement> | null;
  modifiers: ITextFieldBaseModifiers;
  onValueChange: ITextFieldBaseOwnProps<
    TElement,
    TChildrenProps
  >['onValueChange'];
};

export type ITextFieldBaseOwnProps<
  TElement extends HTMLElement,
  TChildrenProps extends object,
> = IControlledValueProps<string | number | ReadonlyArray<string>, TElement> & {
  innerStyles?: {
    field?: IZeroOrMore<ICompiledStyles<IFieldBaseStylesKey>>;
  };

  /**
   * When true, a clear icon button will appear on the right side of the input.
   */
  clearable?: boolean;

  /**
   * The icon of the clear icon button.
   */
  clearIcon?: React.ReactNode;

  /**
   * A ref to the input element, ie. a HTMLInputElement or
   * HTMLTextAreaElement.
   */
  inputRef?: React.Ref<TElement>;

  /**
   * A callback that is called when the clear icon button is clicked.
   */
  onClear?: () => void;

  /**
   * Custom renderer for the input element.
   */
  inputRenderer: IRendererWithForwardedProps<
    ITextFieldBaseRenderProps<TElement, TChildrenProps>,
    React.InputHTMLAttributes<TElement>
  >;
};

type ITextFieldBaseInheritedProps<TChildrenProps extends object> =
  IContainerProps<ITextFieldBaseStylesKey> &
    IForwardableProps &
    IOmit<IFieldBaseOwnProps, 'styles' | 'children'> &
    TChildrenProps;

export type ITextFieldBaseProps<
  TElement extends HTMLElement,
  TChildrenProps extends object = object,
> = ITextFieldBaseInheritedProps<TChildrenProps> &
  ITextFieldBaseOwnProps<TElement, TChildrenProps>;
