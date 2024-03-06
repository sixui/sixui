import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITextFieldStyleKey,
  ITextFieldStyleVarKey,
} from './TextField.styledefs';
import type { IFieldStyleKey, IFieldVariant } from '../Field';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useValidationState } from '@/hooks/useValidationState';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import { useControlled } from '@/hooks/useControlled';
import { Field } from '../Field/Field';
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/textfield/internal/text-field.ts

/**
 * Input types that are compatible with the text field.
 */
export type ITextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'textarea';

/**
 * Input types that are not fully supported for the text field.
 */
export type IUnsupportedTextFieldType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'file'
  | 'month'
  | 'time'
  | 'week';

/**
 * Input types that are incompatible with the text field.
 */
export type IInvalidTextFieldType =
  | 'button'
  | 'checkbox'
  | 'hidden'
  | 'image'
  | 'radio'
  | 'range'
  | 'reset'
  | 'submit';

export type ITextFieldProps = IContainerProps<ITextFieldStyleKey> &
  Pick<
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    | 'required'
    | 'inputMode'
    | 'id'
    | 'name'
    | 'disabled'
    | 'aria-label'
    | 'autoComplete'
    | 'autoCapitalize'
    | 'minLength'
    | 'maxLength'
    | 'placeholder'
    | 'readOnly'
  > &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'min' | 'max' | 'step' | 'pattern' | 'multiple'
  > &
  Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'cols' | 'rows'> & {
    innerStyles?: {
      field?: IZeroOrMore<ICompiledStyles<IFieldStyleKey>>;
    };
    visualState?: IVisualState;
    variant?: IFieldVariant | false;

    /**
     * Gets or sets whether or not the text field is in a visually invalid state.
     */
    hasError?: boolean;

    /**
     * The error message that replaces supporting text when `error` is true. If
     * `errorText` is an empty string, then the supporting text will continue to
     * show.
     */
    errorText?: string;

    /**
     * The floating Material label of the textfield component. It informs the user
     * about what information is requested for a text field. It is aligned with
     * the input text, is always visible, and it floats when focused or when text
     * is entered into the textfield. This label also sets accessibilty labels,
     * but the accessible label is overriden by `aria-label`.
     *
     * Learn more about floating labels from the Material Design guidelines:
     * https://m3.material.io/components/text-fields/guidelines
     */
    label?: string;

    /**
     * An optional prefix to display before the input value.
     */
    prefixText?: string;

    /**
     * An optional suffix to display after the input value.
     */
    suffixText?: string;

    /**
     * Conveys additional information below the text field, such as how it should
     * be used.
     */
    supportingText?: string;

    /**
     * The `<input>` type to use, defaults to "text". The type greatly changes how
     * the text field behaves.
     *
     * Text fields support a limited number of `<input>` types:
     *
     * - text
     * - textarea
     * - email
     * - number
     * - password
     * - search
     * - tel
     * - url
     *
     * See
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
     * for more details on each input type.
     */
    type?: ITextFieldType | IUnsupportedTextFieldType;

    /**
     * The current value of the text field. It is always a string.
     */
    value?: string;
    defaultValue?: string;

    /**
     * When true, hide the spinner for `type="number"` text fields.
     */
    noSpinner?: boolean;

    start?: React.ReactNode;
    end?: React.ReactNode;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      value: string,
    ) => void;
    reportOnBlur?: boolean;
  };

type ITextFieldVariantMap = {
  [key in IFieldVariant]: keyof Pick<
    IThemeComponents,
    'FilledTextField' | 'OutlinedTextField'
  >;
};

const variantMap: ITextFieldVariantMap = {
  filled: 'FilledTextField',
  outlined: 'OutlinedTextField',
};

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  ITextFieldProps
>(function TextField(props, ref) {
  const {
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    variant = 'filled',
    label,
    required,
    prefixText,
    suffixText,
    start,
    end,
    leadingIcon,
    trailingIcon,
    supportingText,
    maxLength = -1,
    minLength = -1,
    noSpinner,
    value: valueProp,
    defaultValue,
    type = 'text',
    hasError: hasErrorProp,
    errorText: errorTextProp,
    disabled,
    onChange,
    reportOnBlur,
    'aria-label': ariaLabelProp,
    ...other
  } = props;

  const hostRef = useRef<HTMLInputElement>(null);
  const { visualState: hostVisualState, ref: hostVisualStateRef } =
    useVisualState(undefined, {
      disabled,
      retainFocusAfterClick: true,
    });
  const hostHandleRef = useForkRef(hostVisualStateRef, hostRef);

  const inputOrTextareaRef = useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );
  const {
    visualState: inputOrTextareaVisualState,
    ref: inputOrTextareaRefVisualStateRef,
  } = useVisualState(undefined, {
    disabled,
    retainFocusAfterClick: true,
  });
  const handleRef = useForkRef(
    ref,
    inputOrTextareaRefVisualStateRef,
    inputOrTextareaRef,
  );

  const visualState = accumulate(
    hostVisualState,
    inputOrTextareaVisualState,
    visualStateProp,
  );

  const { theme, variantTheme } = useComponentTheme(
    'TextField',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ITextFieldStyleKey, ITextFieldStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const hasBeenInteractedWithRef = useRef(false);

  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TextField',
  });
  const { reportValidity, nativeErrorText } =
    useValidationState(inputOrTextareaRef);

  /**
   * `true` when the text field has been interacted with. Native validation
   * errors only display in response to user interactions.
   */
  const isDirtyRef = useRef(false);

  const isTextarea = type === 'textarea';
  const hasError = hasErrorProp || !!nativeErrorText;
  const errorText = hasErrorProp ? errorTextProp : nativeErrorText;

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (event) => {
      hasBeenInteractedWithRef.current = true;
      isDirtyRef.current = true;

      const value = event.currentTarget.value;
      setValue(value);
      onChange?.(event, value);
    },
    [onChange, setValue],
  );

  /**
   * Called when the text field loses focus.
   */
  const handleBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(() => {
    // If the text field has not been interacted with, do not report validity.
    // This prevents the text field from showing an error on page load.
    if (!hasBeenInteractedWithRef.current) {
      return;
    }

    // Reset the interaction flag so that the text field cannot be validated anymore until it has
    // been interacted with again. This prevents a text field in an invalid state from an infinite
    // loop of reporting validity.
    hasBeenInteractedWithRef.current = false;

    const validity = inputOrTextareaRef.current?.validity;

    // Report validity if one of the following is true:
    // - the text field is in a valid state (and clear the native error text) ;
    // - the text field is in an invalid state (and set the native error text), except if the value
    //   is missing (missing values are never checked on blur) ;
    // - the `reportOnBlur` option flag is set (mainly for demo purpose).
    const shouldReportValidity =
      validity?.valid || (hasError && !validity?.valueMissing) || reportOnBlur;

    if (shouldReportValidity) {
      // Calling `reportValidity()` may focus the text field. Since we do this on
      // blur, wait for other focus changes to finish, like tabbing.
      void new Promise((resolve) => setTimeout(resolve)).then(() =>
        reportValidity(),
      );
    }
  }, [reportValidity, hasError, reportOnBlur, inputOrTextareaRef]);

  const renderInputOrTextarea = useCallback((): React.ReactNode => {
    const ariaLabel = ariaLabelProp ?? label;

    // These properties may be set to null if the attribute is removed, and
    // `null > -1` is incorrectly `true`.
    const hasMinLength = (minLength ?? -1) > -1;
    const hasMaxLength = (maxLength ?? -1) > -1;

    if (isTextarea) {
      return (
        <textarea
          {...sxf(
            'input',
            'inputWrapped',
            hasError && 'input$error',
            disabled && 'input$disabled',
          )}
          ref={handleRef}
          // TODO: aria-describedby="description"
          aria-invalid={hasError}
          aria-label={ariaLabel}
          disabled={disabled}
          minLength={hasMinLength ? minLength : undefined}
          maxLength={hasMaxLength ? maxLength : undefined}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          {...other}
        />
      );
    }

    return (
      <div {...sxf('inputWrapper')}>
        {prefixText ? (
          <span
            {...sxf('inputWrapped', 'prefix', disabled && 'prefix$disabled')}
          >
            {prefixText}
          </span>
        ) : null}
        <input
          {...sxf(
            'inputWrapped',
            'input',
            hasError && 'input$error',
            disabled && 'input$disabled',
            noSpinner && 'input$noSpinner',
            type === 'number' && 'input$number',
          )}
          ref={handleRef}
          // TODO: aria-describedby="description"
          aria-invalid={hasError}
          aria-label={ariaLabel}
          disabled={disabled}
          minLength={hasMinLength ? minLength : undefined}
          maxLength={hasMaxLength ? maxLength : undefined}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
          required={required}
          {...other}
        />
        {suffixText ? (
          <span
            {...sxf('inputWrapped', 'suffix', disabled && 'suffix$disabled')}
          >
            {suffixText}
          </span>
        ) : null}
      </div>
    );
  }, [
    sxf,
    isTextarea,
    prefixText,
    value,
    handleChange,
    handleBlur,
    ariaLabelProp,
    hasError,
    disabled,
    minLength,
    maxLength,
    suffixText,
    noSpinner,
    type,
    other,
    handleRef,
    label,
    required,
  ]);

  const renderStart = useCallback(
    (): React.ReactNode | null =>
      start ??
      (leadingIcon ? (
        <span {...sxf('icon', 'icon$leading')}>{leadingIcon}</span>
      ) : null),
    [sxf, start, leadingIcon],
  );

  const renderEnd = useCallback(
    (): React.ReactNode | null =>
      end ??
      (trailingIcon ? (
        <span {...sxf('icon', 'icon$trailing')}>{trailingIcon}</span>
      ) : null),
    [sxf, end, trailingIcon],
  );

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      {...sxf('host', theme.vars, variantTheme?.vars, sx)}
      ref={hostHandleRef}
      onClick={() => inputOrTextareaRef.current?.focus()}
      role='textbox'
      tabIndex={-1}
    >
      <span {...sxf('textField')}>
        <Field
          styles={[
            theme.fieldStyles,
            variantTheme?.fieldStyles,
            ...asArray(innerStyles?.field),
          ]}
          variant={variant}
          count={value?.length}
          disabled={disabled}
          hasError={hasError}
          errorText={errorText}
          visualState={visualState}
          start={renderStart()}
          end={renderEnd()}
          label={label}
          max={maxLength}
          populated={!!value}
          required={required}
          resizable={isTextarea}
          supportingText={supportingText}
          textarea={isTextarea}
        >
          {renderInputOrTextarea()}
        </Field>
      </span>
    </div>
  );
});
