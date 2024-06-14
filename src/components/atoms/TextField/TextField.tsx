import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
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
import { useVisualState } from '@/hooks/useVisualState';
import { useControlledValue } from '@/hooks/useControlledValue';
import { useForkRef } from '@/hooks/useForkRef';
import { IconButton } from '@/components/atoms/IconButton';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { ReactComponent as EyeIcon } from '@/assets/Eye.svg';
import { ReactComponent as EyeSlashIcon } from '@/assets/EyeSlash.svg';

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
    ) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onKeyDown?: React.KeyboardEventHandler<
      HTMLInputElement | HTMLTextAreaElement
    >;

    /**
     * When true, hide the spinner for `type="number"` text fields.
     */
    noSpinner?: boolean;

    unmaskable?: boolean;
    clearable?: boolean;
    clearButtonIcon?: React.ReactNode;
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
    hasError,
    errorText,
    disabled: disabledProp,
    readOnly,
    children,
    containerRef,
    unmaskable: unmaskableProp = true,
    clearable,
    onChange,
    clearButtonIcon,
    role = 'textbox',
    'aria-label': ariaLabelProp,
    ...other
  } = props;

  const inputOrTextareaRef = useRef<HTMLInputElement | HTMLTextAreaElement>(
    null,
  );
  const disabled = disabledProp || readOnly;
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
  const unmaskable = type === 'password' && unmaskableProp;
  const [unmasked, setUnmasked] = useState(false);

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

  const controlled = valueProp !== undefined;
  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue,
    name: 'TextField',
  });

  const isTextarea = type === 'textarea';
  const populated =
    populatedProp ?? (!!value || !!inputOrTextareaRef.current?.value);

  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const handleClearInput = useCallback(() => {
    iconButtonRef.current?.blur();
    if (controlled) {
      setValue('');
    } else {
      inputOrTextareaRef.current!.value = '';
      onChange?.({
        currentTarget: inputOrTextareaRef.current!,
        target: inputOrTextareaRef.current!,
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
    }
    inputOrTextareaRef.current?.focus();
  }, [controlled, setValue, onChange]);

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
          value={controlled ? value : undefined}
          defaultValue={defaultValue}
          required={required}
          data-cy='textarea'
          onChange={onChange}
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
          value={controlled ? value : undefined}
          defaultValue={defaultValue}
          required={required}
          type={type === 'password' ? (unmasked ? 'text' : 'password') : type}
          data-cy='input'
          onChange={onChange}
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
    controlled,
    onChange,
    unmasked,
  ]);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      {...sxf('host', variantTheme?.vars, sx)}
      onClick={(event) => {
        const isSelf = event.target === inputOrTextareaRef.current;
        if (!isSelf) {
          inputOrTextareaRef.current?.focus();
        }
      }}
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
          end={
            end ??
            (clearable ? (
              <IconButton
                data-cy='clearButton'
                ref={iconButtonRef}
                icon={clearButtonIcon ?? <XMarkIcon aria-hidden />}
                onClick={handleClearInput}
              />
            ) : unmaskable ? (
              <IconButton
                onClick={(event) => {
                  event.preventDefault();
                  setUnmasked((unmasked) => !unmasked);
                }}
                icon={<EyeIcon />}
                selectedIcon={<EyeSlashIcon />}
                selected={unmasked}
                toggle
              />
            ) : undefined)
          }
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
