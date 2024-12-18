import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { ITextInputFieldThemeFactory } from './TextInputField.css';
import type { ITextInputFieldFactory } from './TextInputField.types';
import { iconEye, iconEyeSlash, iconXMark } from '~/assets/icons';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { triggerChangeEvent } from '~/utils/triggerChangeEvent';
import { FieldBase } from '../FieldBase';
import { IconButton } from '../IconButton';
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
      type = 'text',
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
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const disabledOrReadOnly = other.disabled || other.readOnly;

    const { getStyles } = useComponentTheme<ITextInputFieldThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: textInputFieldTheme,
      variant,
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
    const unmaskable = type === 'password' && unmaskableProp;
    const [unmasked, setUnmasked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputHandleRef = useMergeRefs(inputRef, forwardedRef);
    const hasEnd = !!other.end || clearable || unmaskable;

    const [focused, setFocused] = useState(false);
    const focus = useFocus({
      onFocusChange: setFocused,
    });

    const handleClear = (): void => {
      if (!inputRef.current) {
        return;
      }

      // Clicking on the clear button will blur the input. When a floating label
      // is present, we prevent the label from switching to the resting state by
      // forcing the focus state as we will focus it again later.
      setFocused(true);
      inputRef.current.focus();

      inputRef.current.value = '';
      setValue('');
      triggerChangeEvent(inputRef.current);
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
              onClick={() => setUnmasked((unmasked) => !unmasked)}
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
      <FieldBase<'input'>
        {...other}
        {...getStyles('root')}
        wrapperProps={{ onClick: handleClick }}
        classNames={classNames}
        interactions={{ focused, ...other.interactions }}
        populated={populated}
        variant={variant}
        end={renderEndSection()}
        forwardProps
        withoutRippleEffect
        managedFocus
      >
        {({ forwardedProps }) => (
          <>
            {children}
            <input
              {...forwardedProps}
              {...focus.focusProps}
              {...getStyles('input')}
              placeholder={other.placeholder}
              type={
                type === 'password' ? (unmasked ? 'text' : 'password') : type
              }
              disabled={other.disabled}
              readOnly={other.readOnly}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
                onChange?.(event);
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
