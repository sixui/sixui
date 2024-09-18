import type {
  IForwardableProps,
  IRendererWithForwardedProps,
} from '~/helpers/react/forwardablePropsTypes';
import type { IStyleProps } from '~/helpers/stylePropsFactory';
import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IControlledValueProps } from '~/hooks/useControlledValue';
import type { IBaseProps } from '../Base';
import type { IFieldBaseProps, IFieldBaseStylesKey } from '../FieldBase';
import type { ITextFieldBaseStylesKey } from './TextFieldBase.styles';

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
  getStyles: IStyleProps<ITextFieldBaseStylesKey>;
  ref: React.RefObject<TElement> | React.RefCallback<TElement> | null;
  modifiers: ITextFieldBaseModifiers;
  onValueChange: ITextFieldBaseProps<TElement, TChildrenProps>['onValueChange'];
};

export type ITextFieldBaseProps<
  TElement extends HTMLElement,
  TChildrenProps extends object = object,
> = IBaseProps<ITextFieldBaseStylesKey> &
  IControlledValueProps<string | number | ReadonlyArray<string>, TElement> &
  IOmit<IFieldBaseProps, 'styles' | 'children'> &
  IForwardableProps & {
    innerStyles?: {
      fieldBase?: IZeroOrMore<ICompiledStyles<IFieldBaseStylesKey>>;
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
