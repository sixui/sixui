import { forwardRef, useRef, useState } from 'react';

import type {
  ITextInputFieldProps,
  ITextInputFieldOwnProps,
} from './TextInputFieldProps';
import { IconButton } from '@/components/atoms/IconButton';
import { TextField } from '@/components/atoms/TextField';
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

    return (
      <TextField<HTMLInputElement, ITextInputFieldOwnProps>
        {...other}
        end={
          other.end ?? unmaskable ? (
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
        onClear={() => {
          if (inputRef.current?.value) {
            inputRef.current.value = '';
          }
        }}
        forwardHtmlPropsToChildren
      >
        {({ sxf, ref, forwardedHtmlProps, modifiers, onValueChange }) => (
          <>
            <div {...sxf('inputWrapper')}>
              {prefixText ? (
                <span
                  {...sxf('prefix', modifiers.disabled && 'prefix$disabled')}
                >
                  {prefixText}
                </span>
              ) : null}

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
                {...forwardedHtmlProps}
                onChange={(event) => {
                  forwardedHtmlProps?.onChange?.(event);
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
        )}
      </TextField>
    );
  },
);
