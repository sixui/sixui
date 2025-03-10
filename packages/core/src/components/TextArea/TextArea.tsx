import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { IAny } from '~/utils/types';
import type { ITextAreaThemeFactory } from './TextArea.css';
import type { ITextAreaFactory } from './TextArea.types';
import { iconXMark } from '~/assets/icons';
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
import { COMPONENT_NAME } from './TextArea.constants';
import { textAreaTheme } from './TextArea.css';

/**
 * @see https://m3.material.io/components/text-fields/overview
 */
export const TextArea = componentFactory<ITextAreaFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      defaultValue,
      value: valueProp,
      clearable: clearableProp,
      clearIcon = <SvgIcon icon={iconXMark} />,
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

    const { getStyles } = useComponentTheme<ITextAreaThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: textAreaTheme,
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const textAreaHandleRef = useMergeRefs(textAreaRef, forwardedRef);
    const hasEnd = !!other.endSlot || clearable;

    const [focused, setFocused] = useState(false);
    const focus = useFocus({ onFocusChange: setFocused });

    const handleClear = (): void => {
      if (!textAreaRef.current) {
        return;
      }

      // Clicking on the clear button will blur the input. When a floating label
      // is present, we prevent the label from switching to the resting state by
      // forcing the focus state as we will focus it again later.
      setFocused(true);

      textAreaRef.current.value = '';
      setValue('');
      triggerChangeEvent(textAreaRef.current);

      textAreaRef.current.focus();
    };

    // TODO: prevents the input from being blurred when the user clicks outside
    // of the textarea.

    // Focus the input when the user clicks on the field.
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      if (focused) {
        return;
      }

      const isInput = event.target === textAreaRef.current;
      if (!isInput) {
        event.stopPropagation();
        textAreaRef.current?.focus();
        textAreaRef.current?.click();
      }
    };

    const renderEndSection = (): React.ReactNode =>
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
        </>
      );

    return (
      <FieldBase
        {...(other as IAny)}
        {...getStyles('root')}
        wrapperProps={{ onClick: handleClick }}
        classNames={classNames}
        variant={variant}
        interactions={{ focused, ...other.interactions }}
        populated={populated}
        disabled={disabled}
        readOnly={readOnly}
        endSlot={renderEndSection()}
        forwardProps
        withoutRippleEffect
        managedFocus
        loading={loading}
        multiline
        ref={rootRef}
      >
        {({ forwardedProps }) => (
          <>
            {children}

            <textarea
              {...mergeProps(focus.focusProps, forwardedProps)}
              {...getStyles('textarea')}
              placeholder={other.placeholder}
              id={id}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              value={value}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setValue(event.target.value);
                onChange?.(event);
              }}
              ref={textAreaHandleRef}
            />
          </>
        )}
      </FieldBase>
    );
  },
);

TextArea.theme = textAreaTheme;
TextArea.displayName = `@sixui/core/${COMPONENT_NAME}`;
