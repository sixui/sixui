import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IThemeComponents } from '@/components/utils/Theme';
import type { ITextFieldStyleKey } from './TextField.styledefs';
import {
  FieldBase,
  type IFieldBaseProps,
  type IFieldBaseStyleKey,
  type IFieldBaseStyleVarKey,
  type IFieldBaseVariant,
} from '../FieldBase';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useValidationState } from '@/hooks/useValidationState';
import { useVisualState } from '@/hooks/useVisualState';
import { useControlled } from '@/hooks/useControlled';
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
    React.AriaAttributes,
    | 'aria-label'
    | 'aria-controls'
    | 'aria-expanded'
    | 'aria-activedescendant'
    | 'aria-labelledby'
    | 'aria-autocomplete'
  > &
  Pick<
    | React.InputHTMLAttributes<HTMLInputElement>
    | React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    | 'required'
    | 'inputMode'
    | 'id'
    | 'name'
    | 'disabled'
    | 'autoComplete'
    | 'spellCheck'
    | 'autoCapitalize'
    | 'minLength'
    | 'maxLength'
    | 'readOnly'
    | 'role'
  > &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'min' | 'max' | 'step' | 'pattern' | 'multiple'
  > &
  Pick<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'cols' | 'rows'> &
  Omit<IFieldBaseProps, 'styles' | 'textarea' | 'resizable'> & {
    innerStyles?: {
      field?: IZeroOrMore<ICompiledStyles<IFieldBaseStyleKey>>;
    };
    value?: string;
    placeholder?: string;
    prefixText?: string;
    suffixText?: string;
    role?: string;

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

    defaultValue?: string;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      value: string,
    ) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyDown?: React.KeyboardEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    >;
    reportOnBlur?: boolean;

    /**
     * When true, hide the spinner for `type="number"` text fields.
     */
    noSpinner?: boolean;
  };

type ITextFieldVariantMap = {
  [key in IFieldBaseVariant]: keyof Pick<
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
    start,
    end,
    populated: populatedProp,
    leadingIcon,
    trailingIcon,
    supportingText,
    prefixText,
    suffixText,
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
    onFocus,
    onBlur,
    onKeyDown,
    reportOnBlur,
    children,
    containerRef,
    role = 'textbox',
    'aria-label': ariaLabelProp,
    ...other
  } = props;

  const inputOrTextareaRef = useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );
  const { visualState, ref: inputOrTextareaRefVisualStateRef } = useVisualState(
    visualStateProp,
    {
      disabled,
      retainFocusAfterClick: true,
    },
  );
  const handleRef = useForkRef(
    ref,
    inputOrTextareaRefVisualStateRef,
    inputOrTextareaRef,
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
      stylePropsFactory<ITextFieldStyleKey, IFieldBaseStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const hasBeenInteractedWithRef = useRef(false);

  const isControlled = valueProp !== undefined;
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TextField',
    // TODO: wait for a fix and delete this option.
    // See: https://github.com/tailwindlabs/headlessui/issues/3044
    noDefaultStateWarning: true,
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
  const populated =
    populatedProp ?? (!!value || !!inputOrTextareaRef.current?.value);

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
  > = useCallback(
    (event) => {
      onBlur?.(event);

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
        validity?.valid ||
        (hasError && !validity?.valueMissing) ||
        reportOnBlur;

      if (shouldReportValidity) {
        // Calling `reportValidity()` may focus the text field. Since we do this on
        // blur, wait for other focus changes to finish, like tabbing.
        void new Promise((resolve) => setTimeout(resolve)).then(() =>
          reportValidity(),
        );
      }
    },
    [reportValidity, hasError, reportOnBlur, inputOrTextareaRef, onBlur],
  );

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
          value={isControlled ? value : undefined}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          required={required}
          {...other}
        />
      );
    }

    return (
      <div {...sxf('inputWrapper')}>
        {prefixText ? (
          <span {...sxf('prefix', disabled && 'prefix$disabled')}>
            {prefixText}
          </span>
        ) : null}
        <input
          {...sxf(
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
          value={isControlled ? value : undefined}
          defaultValue={defaultValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={handleBlur}
          onKeyDown={onKeyDown}
          required={required}
          type={type}
          {...other}
        />
        {suffixText ? (
          <span {...sxf('suffix', disabled && 'suffix$disabled')}>
            {suffixText}
          </span>
        ) : null}
      </div>
    );
  }, [
    sxf,
    isTextarea,
    value,
    defaultValue,
    handleChange,
    onFocus,
    handleBlur,
    onKeyDown,
    ariaLabelProp,
    hasError,
    disabled,
    minLength,
    maxLength,
    noSpinner,
    type,
    other,
    handleRef,
    label,
    required,
    prefixText,
    suffixText,
    isControlled,
  ]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      {...sxf('host', theme.vars, variantTheme?.vars, sx)}
      onClick={() => inputOrTextareaRef.current?.focus()}
      role={role}
      tabIndex={-1}
    >
      <span {...sxf('textField')}>
        <FieldBase
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
          start={start}
          end={end}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          label={label}
          max={maxLength}
          populated={populated}
          required={required}
          resizable={isTextarea}
          supportingText={supportingText}
          textarea={isTextarea}
          containerRef={containerRef}
        >
          {children}
          {renderInputOrTextarea()}
        </FieldBase>
      </span>
    </div>
  );
});
