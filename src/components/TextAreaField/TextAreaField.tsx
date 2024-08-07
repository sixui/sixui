import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { ITextAreaFieldProps } from './TextAreaField.types';
import { TextFieldBase, type ITextFieldBaseProps } from '../TextFieldBase';

export const TextAreaField = forwardRef<HTMLDivElement, ITextAreaFieldProps>(
  function TextAreaField(props, forwardedRef) {
    const { inputRef: inputRefProp, ...other } = props;
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const inputHandleRef = useMergeRefs([inputRef, inputRefProp]);

    const inputRenderer: ITextFieldBaseProps<HTMLTextAreaElement>['inputRenderer'] =
      ({ getStyles, ref, forwardedProps, modifiers, onValueChange }) => (
        <textarea
          {...getStyles(
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
      <TextFieldBase<HTMLTextAreaElement, ITextAreaFieldProps>
        {...other}
        ref={forwardedRef}
        textArea
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
