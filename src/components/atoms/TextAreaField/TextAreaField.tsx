import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { ITextAreaFieldProps } from './TextAreaFieldProps';
import { TextField, type ITextFieldProps } from '@/components/atoms/TextField';

export const TextAreaField = forwardRef<HTMLDivElement, ITextAreaFieldProps>(
  function TextAreaField(props, forwardedRef) {
    const { inputRef: inputRefProp, ...other } = props;
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const inputHandleRef = useMergeRefs([inputRef, inputRefProp]);

    const inputRenderer: ITextFieldProps<HTMLTextAreaElement>['inputRenderer'] =
      ({ sxf, ref, forwardedProps, modifiers, onValueChange }) => (
        <textarea
          {...sxf(
            'input',
            modifiers.hasError && 'input$error',
            modifiers.disabled && 'input$disabled',
          )}
          disabled={modifiers.disabled}
          {...forwardedProps}
          onChange={(event) => {
            forwardedProps?.onChange?.(event);
            onValueChange?.(event.target.value, event.target);
          }}
          ref={ref}
        />
      );

    return (
      <TextField<HTMLTextAreaElement, ITextAreaFieldProps>
        {...other}
        textArea
        resizable
        ref={forwardedRef}
        inputRef={inputHandleRef}
        onClear={() => {
          if (inputRef.current?.value) {
            inputRef.current.value = '';
          }
        }}
        forwardProps
        inputRenderer={inputRenderer}
      />
    );
  },
);
