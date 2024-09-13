import { useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { useFocus } from 'react-aria';

import type { ITextInputFieldFactory } from './TextInputField.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { iconEye, iconEyeSlash, iconXMark } from '~/assets/icons';
import { useControlledValue } from '~/hooks/useControlledValue';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import { FieldBase } from '../FieldBase';
import { Box } from '../Box';
import {
  textInputFieldTheme,
  type ITextInputFieldThemeFactory,
} from './TextInputField.css';

const COMPONENT_NAME = 'TextInputField';

// Warning: this function uses React internals that may change in the future.
const triggerChangeEvent = (
  input: HTMLInputElement & {
    _valueTracker?: { setValue: (value: string) => void };
  },
): void => {
  // https://stackoverflow.com/a/78712814/7628220
  const tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue('some-unlikely-fake-value');
  }
  const event = new Event('change', { bubbles: true });
  input.dispatchEvent(event);
};

export const TextInputField =
  polymorphicComponentFactory<ITextInputFieldFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      type = 'text',
      defaultValue,
      value: valueProp,
      onValueChange,
      noSpinner,
      clearable: clearableProp,
      clearIcon = <SvgIcon icon={iconXMark} />,
      unmaskable: unmaskableProp = true,
      maskIcon = <SvgIcon icon={iconEyeSlash} />,
      unmaskIcon = <SvgIcon icon={iconEye} />,
      inputRef: inputRefProp,
      onChange,
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
      onValueChange,
    });

    const populated = other.populated ?? !!value;
    const clearable = clearableProp && !disabledOrReadOnly && populated;
    const unmaskable = type === 'password' && unmaskableProp;
    const [unmasked, setUnmasked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputHandleRef = useMergeRefs([inputRef, inputRefProp]);
    const hasEnd = !!other.end || clearable || unmaskable;

    const [focused, setFocused] = useState(false);
    const focus = useFocus({ onFocusChange: setFocused });

    const handleClear = (): void => {
      if (!inputRef.current) {
        return;
      }

      inputRef.current.value = '';
      setValue('');
      triggerChangeEvent(inputRef.current);
      inputRef.current.focus();
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

    return (
      <FieldBase
        {...other}
        {...getStyles('root')}
        wrapperProps={{
          onClick: handleClick,
        }}
        classNames={classNames}
        interactions={{ focused, ...other.interactions }}
        populated={populated}
        variant={variant}
        end={
          hasEnd ? (
            <>
              {other.end}
              {clearable && (
                <IconButton
                  data-cy='clearButton'
                  icon={clearIcon}
                  onPress={handleClear}
                />
              )}
              {unmaskable && (
                <IconButton
                  onPress={() => setUnmasked((unmasked) => !unmasked)}
                  icon={unmaskIcon}
                  selectedIcon={maskIcon}
                  selected={unmasked}
                  toggle
                />
              )}
            </>
          ) : undefined
        }
        ref={forwardedRef}
      >
        {({ forwardedProps }) => (
          <Box
            as='input'
            {...forwardedProps}
            {...focus.focusProps}
            {...getStyles('input')}
            placeholder={other.placeholder}
            modifiers={{
              disabled: disabledOrReadOnly,
              'with-error': !!other.hasError,
              'no-spinner': noSpinner,
            }}
            type={type === 'password' ? (unmasked ? 'text' : 'password') : type}
            disabled={other.disabled}
            readOnly={other.readOnly}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setValue(event.target.value);
              onChange?.(event);
            }}
            ref={inputHandleRef}
          />
        )}
      </FieldBase>
    );
  });

TextInputField.theme = textInputFieldTheme;
TextInputField.displayName = `@sixui/${COMPONENT_NAME}`;
