import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { ITextInputControlThemeFactory } from './TextInputControl.css';
import type { ITextInputControlFactory } from './TextInputControl.types';
import { iconEye, iconEyeSlash, iconXMark } from '~/assets/icons';
import { FieldBase } from '~/components/FieldBase';
import { IconButton } from '~/components/IconButton';
import { useLabeledContext } from '~/components/Labeled/Labeled.context';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { triggerChangeEvent } from '~/utils/react';
import { COMPONENT_NAME } from './TextInputControl.constants';
import { textInputControlTheme } from './TextInputControl.css';

/**
 * @see https://m3.material.io/components/text-fields/overview
 */
export const TextInputControl = componentFactory<ITextInputControlFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      type: typeProp = 'text',
      defaultValue,
      value: valueProp,
      clearable: clearableProp,
      clearIcon = <SvgIcon icon={iconXMark} />,
      unmaskable: unmaskableProp = true,
      maskIcon = <SvgIcon icon={iconEyeSlash} />,
      unmaskIcon = <SvgIcon icon={iconEye} />,
      onChange,
      children,
      loading,
      rootRef,
      id: idProp,
      inputProps,
      min,
      max,
      minLength,
      maxLength,
      pattern,
      step,
      autoComplete,
      autoCapitalize,
      autoCorrect,
      autoFocus,
      spellCheck,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const id = idProp ?? labeledContext?.id;
    const disabled = other.disabled ?? labeledContext?.disabled;
    const readOnly = other.readOnly ?? labeledContext?.readOnly;
    const required = other.required ?? labeledContext?.required;

    const disabledOrReadOnly = other.disabled || other.readOnly;

    const { getStyles } = useComponentTheme<ITextInputControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: textInputControlTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        'with-error': !!other.hasError,
      },
    });

    const [value, setValue] = useControlledValue({
      controlled: valueProp,
      default: defaultValue ?? '',
      name: COMPONENT_NAME,
    });

    const populated = other.populated ?? !!value;
    const clearable = clearableProp && !disabledOrReadOnly && populated;
    const unmaskable = typeProp === 'password' && unmaskableProp;
    const [unmasked, setUnmasked] = useState(false);
    const type =
      typeProp === 'password' ? (unmasked ? 'text' : 'password') : typeProp;
    const inputRef = useRef<HTMLInputElement>(null);
    const inputHandleRef = useMergeRefs(inputRef, forwardedRef);
    const hasEnd = !!other.endSlot || clearable || unmaskable;

    const [focused, setFocused] = useState(false);
    const focus = useFocus({
      onFocusChange: setFocused,
    });

    const handleClear = (): void => {
      // Clicking on the clear button will blur the input. When a floating label
      // is present, we prevent the label from switching to the resting state by
      // forcing the focus state as we will focus it again later.
      setFocused(true);

      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.value = '';
        triggerChangeEvent(inputRef.current);
      }

      setValue('');
    };

    // Focus the input when the user clicks on the field.
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      if (focused) {
        return;
      }

      const isInput = event.target === inputRef.current;
      if (!isInput) {
        event.stopPropagation();
        inputRef.current?.focus();
        inputRef.current?.click();
      }
    };

    // Restore the cursor position when masking/unmasking the password.
    const handleUnmask = (): void => {
      if (inputRef.current) {
        inputRef.current.focus();

        // Place the cursor at the end of the input.
        const currentPosition = inputRef.current.selectionStart;
        inputRef.current.setSelectionRange(currentPosition, currentPosition);
      }

      // Execute in the next tick to prevent the cursor to reset to the start.
      setTimeout(() => {
        setUnmasked((unmasked) => !unmasked);
      }, 0);
    };

    const renderEndSlot = (): React.ReactNode =>
      hasEnd && (
        <>
          {other.endSlot}
          {clearable && (
            <IconButton
              data-cy="clearButton"
              icon={clearIcon}
              onClick={handleClear}
            />
          )}
          {unmaskable && (
            <IconButton
              onClick={handleUnmask}
              icon={unmaskIcon}
              selectedIcon={maskIcon}
              selected={unmasked}
              disabled={disabledOrReadOnly}
              toggle
            />
          )}
        </>
      );

    return (
      <FieldBase
        {...other}
        {...getStyles('root')}
        wrapperProps={{ onClick: handleClick }}
        classNames={classNames}
        variant={variant}
        interactions={{ focused, ...other.interactions }}
        populated={populated}
        disabled={disabled}
        readOnly={readOnly}
        endSlot={renderEndSlot()}
        forwardForeignProps
        withoutRippleEffect
        managedFocus
        loading={loading}
        ref={rootRef}
      >
        {({ foreignProps }) => (
          <>
            {children}

            <input
              {...mergeProps(focus.focusProps, foreignProps)}
              {...getStyles('input')}
              ref={inputHandleRef}
              placeholder={other.placeholder}
              type={type}
              id={id}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
                onChange?.(event);
              }}
              min={min}
              max={max}
              step={step}
              minLength={minLength}
              maxLength={maxLength}
              pattern={pattern}
              autoComplete={autoComplete}
              autoCapitalize={autoCapitalize}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              spellCheck={spellCheck}
              {...inputProps}
            />
          </>
        )}
      </FieldBase>
    );
  },
);

TextInputControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
TextInputControl.theme = textInputControlTheme;
