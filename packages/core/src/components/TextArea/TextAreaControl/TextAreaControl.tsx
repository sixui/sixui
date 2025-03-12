import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { IAny } from '~/utils/types';
import type { ITextAreaControlThemeFactory } from './TextAreaControl.css';
import type { ITextAreaControlFactory } from './TextAreaControl.types';
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
import { COMPONENT_NAME } from './TextAreaControl.constants';
import { textAreaControlTheme } from './TextAreaControl.css';

/**
 * @see https://m3.material.io/components/text-fields/overview
 */
export const TextAreaControl = componentFactory<ITextAreaControlFactory>(
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
      textAreaProps,
      rows,
      cols,
      autoComplete,
      autoCapitalize,
      autoCorrect,
      autoFocus,
      spellCheck,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const id = other.id ?? labeledContext?.id;
    const disabled = other.disabled ?? labeledContext?.disabled;
    const readOnly = other.readOnly ?? labeledContext?.readOnly;
    const required = other.required ?? labeledContext?.required;

    const disabledOrReadOnly = other.disabled || other.readOnly;

    const { getStyles } = useComponentTheme<ITextAreaControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: textAreaControlTheme,
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
    const textAreaControlRef = useRef<HTMLTextAreaElement>(null);
    const textAreaControlHandleRef = useMergeRefs(
      textAreaControlRef,
      forwardedRef,
    );
    const hasEnd = !!other.endSlot || clearable;

    const [focused, setFocused] = useState(false);
    const focus = useFocus({ onFocusChange: setFocused });

    const handleClear = (): void => {
      if (!textAreaControlRef.current) {
        return;
      }

      // Clicking on the clear button will blur the input. When a floating label
      // is present, we prevent the label from switching to the resting state by
      // forcing the focus state as we will focus it again later.
      setFocused(true);

      textAreaControlRef.current.value = '';
      setValue('');
      triggerChangeEvent(textAreaControlRef.current);

      textAreaControlRef.current.focus();
    };

    // TODO: prevents the input from being blurred when the user clicks outside
    // of the textarea.

    // Focus the input when the user clicks on the field.
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      if (focused) {
        return;
      }

      const isInput = event.target === textAreaControlRef.current;
      if (!isInput) {
        event.stopPropagation();
        textAreaControlRef.current?.focus();
        textAreaControlRef.current?.click();
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
              ref={textAreaControlHandleRef}
              rows={rows}
              cols={cols}
              autoComplete={autoComplete}
              autoCapitalize={autoCapitalize}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              spellCheck={spellCheck}
              {...textAreaProps}
            />
          </>
        )}
      </FieldBase>
    );
  },
);

TextAreaControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
TextAreaControl.theme = textAreaControlTheme;
