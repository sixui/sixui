import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IIcon } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITextFieldStyleKey,
  ITextFieldStyleVarKey,
} from './TextField.styledefs';
import type { IFieldVariant } from '../Field';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useValidationState } from '@/hooks/useValidationState';
import { useVisualState } from '@/hooks/useVisualState';
import { useControlled } from '@/hooks/useControlled';
import { Field } from '../Field/Field';

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

export interface ITextFieldProps
  extends IContainer<ITextFieldStyleKey, ITextFieldStyleVarKey>,
    Pick<
      | React.InputHTMLAttributes<HTMLInputElement>
      | React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      | 'required'
      | 'inputMode'
      | 'name'
      | 'disabled'
      | 'aria-label'
      | 'autoComplete'
      | 'minLength'
      | 'maxLength'
      | 'placeholder'
      | 'readOnly'
    >,
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'min' | 'max' | 'step' | 'pattern' | 'multiple'
    >,
    Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'cols' | 'rows'> {
  variant?: IFieldVariant;
  forwardRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;

  /**
   * Gets or sets whether or not the text field is in a visually invalid state.
   */
  error?: boolean;

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
  leadingIcon?: IIcon;
  trailingIcon?: IIcon;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
  ) => void;
  reportOnBlur?: boolean;
}

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

// https://github.com/material-components/material-web/blob/main/textfield/internal/text-field.ts
export const TextField: React.FC<ITextFieldProps> = ({
  variant = 'filled',
  forwardRef,
  name,
  label,
  required,
  prefixText,
  suffixText,
  start,
  end,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  supportingText,
  cols = 20,
  rows = 2,
  inputMode,
  max,
  maxLength = -1,
  min,
  minLength = -1,
  pattern,
  placeholder,
  noSpinner,
  readOnly,
  multiple,
  step,
  type = 'text',
  autoComplete,
  disabled,
  onChange,
  reportOnBlur,
  ...props
}) => {
  const { theme, styles, fieldStyles } = useComponentTheme('TextField');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const hostElRef = React.useRef<HTMLDivElement>(null);
  const inputOrTextareaElInternalRef = React.useRef<
    HTMLInputElement | HTMLTextAreaElement
  >(null);
  const inputOrTextareaElRef = forwardRef ?? inputOrTextareaElInternalRef;
  const [value, setValue] = useControlled({
    controlled: props.value,
    default: props.defaultValue,
    name: 'TextField',
  });
  const { reportValidity, nativeErrorText } =
    useValidationState(inputOrTextareaElRef);

  /**
   * true when the text field has been interacted with. Native validation errors only display in
   * response to user interactions.
   */
  const isDirtyRef = React.useRef(false);

  const hostVisualState = useVisualState(hostElRef);
  const inputOrTextareaVisualState = useVisualState(inputOrTextareaElRef, {
    retainFocusAfterClick: true,
  });
  const hasBeenInteractedWithRef = React.useRef(false);

  const visualState = React.useMemo(
    () =>
      accumulate(
        hostVisualState,
        inputOrTextareaVisualState,
        props.visualState,
      ),
    [hostVisualState, inputOrTextareaVisualState, props.visualState],
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITextFieldStyleKey, ITextFieldStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
  );

  const isTextarea = type === 'textarea';
  const hasError = props.error || !!nativeErrorText;
  const errorText = props.error ? props.errorText : nativeErrorText;

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = React.useCallback(
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
  > = React.useCallback(() => {
    // If the text field has not been interacted with, do not report validity.
    // This prevents the text field from showing an error on page load.
    if (!hasBeenInteractedWithRef.current) {
      return;
    }

    // Reset the interaction flag so that the text field cannot be validated anymore until it has
    // been interacted with again. This prevents a text field in an invalid state from an infinite
    // loop of reporting validity.
    hasBeenInteractedWithRef.current = false;

    const validity = inputOrTextareaElRef.current?.validity;

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
  }, [reportValidity, hasError, reportOnBlur, inputOrTextareaElRef]);

  const renderInputOrTextarea = React.useCallback(() => {
    const ariaLabel = props['aria-label'] ?? label;

    // These properties may be set to null if the attribute is removed, and
    // `null > -1` is incorrectly `true`.
    const hasMinLength = (minLength ?? -1) > -1;
    const hasMaxLength = (maxLength ?? -1) > -1;

    if (isTextarea) {
      return (
        <textarea
          {...styleProps([
            'input',
            'inputWrapped',
            hasError && 'input$error',
            disabled && 'input$disabled',
          ])}
          ref={inputOrTextareaElRef as React.RefObject<HTMLTextAreaElement>}
          name={name}
          // TODO: aria-describedby="description"
          aria-invalid={hasError}
          aria-label={ariaLabel}
          autoComplete={autoComplete}
          disabled={disabled}
          minLength={hasMinLength ? minLength : undefined}
          maxLength={hasMaxLength ? maxLength : undefined}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          cols={cols}
          rows={rows}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
    }

    return (
      <div {...styleProps(['inputWrapper'])}>
        {prefixText ? (
          <span
            {...styleProps([
              'inputWrapped',
              'prefix',
              disabled && 'prefix$disabled',
            ])}
          >
            {prefixText}
          </span>
        ) : null}
        <input
          {...styleProps([
            'inputWrapped',
            'input',
            hasError && 'input$error',
            disabled && 'input$disabled',
            noSpinner && 'input$noSpinner',
            type === 'number' && 'input$number',
          ])}
          ref={inputOrTextareaElRef as React.RefObject<HTMLInputElement>}
          name={name}
          // TODO: aria-describedby="description"
          aria-invalid={hasError}
          aria-label={ariaLabel}
          autoComplete={autoComplete}
          disabled={disabled}
          inputMode={inputMode}
          min={min}
          max={max}
          minLength={hasMinLength ? minLength : undefined}
          maxLength={hasMaxLength ? maxLength : undefined}
          pattern={pattern}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          multiple={multiple}
          step={step}
          type={type}
          value={value ?? ''}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {suffixText ? (
          <span
            {...styleProps([
              'inputWrapped',
              'suffix',
              disabled && 'suffix$disabled',
            ])}
          >
            {suffixText}
          </span>
        ) : null}
      </div>
    );
  }, [
    name,
    inputOrTextareaElRef,
    isTextarea,
    styleProps,
    prefixText,
    suffixText,
    props,
    label,
    autoComplete,
    disabled,
    inputMode,
    hasError,
    min,
    max,
    minLength,
    maxLength,
    cols,
    rows,
    pattern,
    placeholder,
    readOnly,
    required,
    multiple,
    step,
    type,
    value,
    handleChange,
    handleBlur,
    noSpinner,
  ]);

  const renderStart = React.useCallback(
    () =>
      start ??
      (LeadingIcon ? (
        <span {...styleProps(['icon', 'icon$leading'])}>
          <LeadingIcon aria-hidden />
        </span>
      ) : null),
    [styleProps, start, LeadingIcon],
  );

  const renderEnd = React.useCallback(
    () =>
      end ??
      (TrailingIcon ? (
        <span {...styleProps(['icon', 'icon$trailing'])}>
          <TrailingIcon aria-hidden />
        </span>
      ) : null),
    [styleProps, end, TrailingIcon],
  );

  return (
    <div
      {...styleProps(['host'], [theme, variantTheme, props.theme])}
      ref={hostElRef}
      onClick={() => inputOrTextareaElRef.current?.focus()}
      role='textbox'
      tabIndex={-1}
      onKeyDown={() => {}}
    >
      <span {...styleProps(['textField'])}>
        <Field
          styles={fieldStyles}
          variant={variant}
          count={value?.length}
          disabled={disabled}
          error={hasError}
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
};
