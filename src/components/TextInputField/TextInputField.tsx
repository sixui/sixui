import { forwardRef, useRef, useState } from 'react';

import type {
  ITextInputFieldProps,
  ITextInputFieldOwnProps,
} from './TextInputField.types';
import { IconButton } from '@/components/IconButton';
import {
  TextFieldBase,
  type ITextFieldBaseProps,
} from '@/components/TextFieldBase';
import { ReactComponent as EyeIcon } from '@/assets/Eye.svg';
import { ReactComponent as EyeSlashIcon } from '@/assets/EyeSlash.svg';
import { useMergeRefs } from '@floating-ui/react';

export const TextInputField = forwardRef<HTMLDivElement, ITextInputFieldProps>(
  function TextInputField(props, forwardedRef) {
    const {
      type = 'text',
      prefixText,
      suffixText,
      noSpinner,
      unmaskable: unmaskableProp = true,
      maskIcon = <EyeSlashIcon aria-hidden />,
      unmaskIcon = <EyeIcon aria-hidden />,
      inputRef: inputRefProp,
      ...other
    } = props;
    const unmaskable = type === 'password' && unmaskableProp;
    const [unmasked, setUnmasked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputHandleRef = useMergeRefs([inputRef, inputRefProp]);

    const inputRenderer: ITextFieldBaseProps<HTMLInputElement>['inputRenderer'] =
      ({ sxf, ref, forwardedProps, modifiers, onValueChange }) => (
        <>
          {prefixText ? (
            <span {...sxf('prefix', modifiers.disabled && 'prefix$disabled')}>
              {prefixText}
            </span>
          ) : null}

          <div {...sxf('inputWrapper')}>
            <input
              {...sxf(
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
            <span {...sxf('suffix', modifiers.disabled && 'suffix$disabled')}>
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
      <TextFieldBase<HTMLInputElement, ITextInputFieldOwnProps>
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
);
