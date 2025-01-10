import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { ITextInputFieldThemeFactory } from './TextInputField.css';
import type { ITextInputFieldFactory } from './TextInputField.types';
import { iconEye, iconEyeSlash, iconXMark } from '~/assets/icons';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { triggerChangeEvent } from '~/utils/triggerChangeEvent';
import { FieldBase } from '../FieldBase';
import { IconButton } from '../IconButton';
import { useLabeledContext } from '../Labeled';
import { SvgIcon } from '../SvgIcon';
import { textInputFieldTheme } from './TextInputField.css';

const COMPONENT_NAME = 'TextInputField';

export const TextInputField = componentFactory<ITextInputFieldFactory>(
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
      noSpinner,
      clearable: clearableProp,
      clearIcon = <SvgIcon icon={iconXMark} />,
      unmaskable: unmaskableProp = true,
      maskIcon = <SvgIcon icon={iconEyeSlash} />,
      unmaskIcon = <SvgIcon icon={iconEye} />,
      onChange,
      children,
      loading,
      rootRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const id = other.id ?? labeledContext?.id;
    const disabled = other.disabled ?? labeledContext?.disabled;
    const readOnly = other.readOnly ?? labeledContext?.readOnly;
    const required = other.required ?? labeledContext?.required;

    const disabledOrReadOnly = other.disabled || other.readOnly;

    const { getStyles } = useComponentTheme<ITextInputFieldThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: textInputFieldTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        'with-error': !!other.hasError,
        'no-spinner': noSpinner,
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
    const hasEnd = !!other.end || clearable || unmaskable;

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

    // TODO: prevents the input from being blurred when the user clicks outside
    // of the input.

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
        const currentPosition = inputRef.current?.selectionStart;
        inputRef.current.setSelectionRange(currentPosition, currentPosition);
      }

      // Execute in the next tick to prevent the cursor to reset to the start.
      setTimeout(() => setUnmasked((unmasked) => !unmasked), 0);
    };

    const renderEndSection = (): React.JSX.Element | null =>
      hasEnd ? (
        <>
          {other.end}
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
      ) : null;

    return (
      <FieldBase
        {...other}
        {...getStyles('root')}
        wrapperProps={{ onClick: handleClick }}
        classNames={classNames}
        interactions={{ focused, ...other.interactions }}
        populated={populated}
        disabled={disabled}
        readOnly={readOnly}
        variant={variant}
        end={renderEndSection()}
        forwardProps
        withoutRippleEffect
        managedFocus
        loading={loading}
        ref={rootRef}
      >
        {({ forwardedProps }) => (
          <>
            {children}

            <input
              {...mergeProps(focus.focusProps, forwardedProps)}
              {...getStyles('input')}
              placeholder={other.placeholder}
              type={type}
              id={id}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const nextValue = event.target.value;
                setValue(nextValue);
                onChange?.(nextValue);
              }}
              ref={inputHandleRef}
            />
          </>
        )}
      </FieldBase>
    );
  },
);

TextInputField.theme = textInputFieldTheme;
TextInputField.displayName = `@sixui/${COMPONENT_NAME}`;
