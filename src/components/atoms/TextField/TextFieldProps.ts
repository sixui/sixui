import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type {
  IFieldBaseOwnProps,
  IFieldBaseStyleKey,
  IFieldBaseStyleVarKey,
} from '@/components/atoms/FieldBase';
import type { ITextFieldStyleKey } from './TextField.styledefs';
import type { IStyleProps } from '@/helpers/stylePropsFactory';
import type { IControlledValueProps } from '@/hooks/useControlledValue';
import type { IForwardableHtmlProps } from '@/helpers/react/forwardableHtmlPropsTypes';

export type ITextFieldModifiers = {
  /**
   * When true, the text field will have an error state.
   */
  hasError?: boolean;

  /**
   * When true, the text field will be non-interactive.
   */
  disabled?: boolean;
};

export type ITextFieldRenderProps<TElement extends HTMLElement> = {
  sxf: IStyleProps<ITextFieldStyleKey, IFieldBaseStyleVarKey>;
  ref: React.RefObject<TElement> | React.RefCallback<TElement> | null;
  modifiers: ITextFieldModifiers;
  onValueChange: ITextFieldOwnProps<TElement>['onValueChange'];
};

export type ITextFieldOwnProps<TElement extends HTMLElement = HTMLElement> =
  IControlledValueProps<string, TElement> & {
    innerStyles?: {
      field?: IZeroOrMore<ICompiledStyles<IFieldBaseStyleKey>>;
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
  };

type ITextFieldInheritedProps<
  TChildrenElement extends HTMLElement,
  TChildrenProps extends object,
> = IContainerProps<ITextFieldStyleKey> &
  IForwardableHtmlProps<
    ITextFieldRenderProps<TChildrenElement>,
    React.HTMLAttributes<TChildrenElement>
  > &
  IOmit<IFieldBaseOwnProps, 'styles' | 'children'> &
  TChildrenProps;

export type ITextFieldProps<
  TElement extends HTMLElement = HTMLElement,
  TChildrenProps extends object = object,
> = ITextFieldInheritedProps<TElement, TChildrenProps> &
  ITextFieldOwnProps<TElement>;
