import { forwardRef, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { ITextInputFieldProps } from './TextInputField.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { IconButton } from '../IconButton';
import { TextFieldBase, type ITextFieldBaseProps } from '../TextFieldBase';
import { SvgIcon } from '../SvgIcon';
import { iconEye, iconEyeSlash } from '~/assets/icons';

export const TextInputField = createPolymorphicComponent<
  'input',
  ITextInputFieldProps
>(
  forwardRef<HTMLInputElement, ITextInputFieldProps>(
    function TextInputField(props, forwardedRef) {
      const {
        type = 'text',
        prefixText,
        suffixText,
        noSpinner,
        unmaskable: unmaskableProp = true,
        maskIcon = <SvgIcon icon={iconEyeSlash} />,
        unmaskIcon = <SvgIcon icon={iconEye} />,
        inputRef: inputRefProp,
        ...other
      } = props;
      const unmaskable = type === 'password' && unmaskableProp;
      const [unmasked, setUnmasked] = useState(false);
      const inputRef = useRef<HTMLInputElement>(null);
      const inputHandleRef = useMergeRefs([inputRef, inputRefProp]);

      const inputRenderer: ITextFieldBaseProps<HTMLInputElement>['inputRenderer'] =
        ({ getStyles, ref, forwardedProps, modifiers, onValueChange }) => (
          <>
            {prefixText ? (
              <span
                {...getStyles(
                  'prefix',
                  modifiers.disabled && 'prefix$disabled',
                )}
              >
                {prefixText}
              </span>
            ) : null}

            <div {...getStyles('inputWrapper')}>
              <input
                {...getStyles(
                  'input',
                  modifiers.hasError && 'input$error',
                  modifiers.disabled && 'input$disabled',
                  noSpinner && 'input$noSpinner',
                  type === 'number' && 'input$number',
                )}
                type={
                  type === 'password' ? (unmasked ? 'text' : 'password') : type
                }
                disabled={modifiers.disabled}
                {...forwardedProps}
                onChange={(event) => {
                  forwardedProps?.onChange?.(event);
                  onValueChange?.(event.target.value, event.target);
                }}
                ref={ref}
              />
            </div>

            {suffixText ? (
              <span
                {...getStyles(
                  'suffix',
                  modifiers.disabled && 'suffix$disabled',
                )}
              >
                {suffixText}
              </span>
            ) : null}
          </>
        );

      const handleClear = (): void => {
        if (inputRef.current?.value) {
          inputRef.current.value = '';
        }
        other.onChange?.({
          target: inputRef.current,
        } as React.ChangeEvent<HTMLInputElement>);
      };

      return (
        <TextFieldBase<HTMLInputElement, ITextInputFieldProps>
          {...other}
          end={
            (other.end ?? unmaskable) ? (
              <>
                {other.end}
                {unmaskable ? (
                  <IconButton
                    onClick={(event) => {
                      event.preventDefault();
                      setUnmasked((unmasked) => !unmasked);
                    }}
                    icon={unmaskIcon}
                    selectedIcon={maskIcon}
                    selected={unmasked}
                    toggle
                  />
                ) : undefined}
              </>
            ) : undefined
          }
          ref={forwardedRef}
          inputRef={inputHandleRef}
          onClear={handleClear}
          forwardProps
          inputRenderer={inputRenderer}
        />
      );
    },
  ),
);
