import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { IAny } from '~/helpers/types';
import type { ITextAreaFieldThemeFactory } from './TextAreaField.css';
import type { ITextAreaFieldFactory } from './TextAreaField.types';
import { iconXMark } from '~/assets/icons';
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
import { textAreaFieldTheme } from './TextAreaField.css';

const COMPONENT_NAME = 'TextAreaField';

export const TextAreaField = componentFactory<ITextAreaFieldFactory>(
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

    const { getStyles } = useComponentTheme<ITextAreaFieldThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: textAreaFieldTheme,
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
    const hasEnd = !!other.end || clearable;

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
        </>
      ) : null;

    return (
      <FieldBase
        {...(other as IAny)}
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
                onChange?.(event, event.target.value);
              }}
              ref={textAreaHandleRef}
            />
          </>
        )}
      </FieldBase>
    );
  },
);

TextAreaField.theme = textAreaFieldTheme;
TextAreaField.displayName = `@sixui/${COMPONENT_NAME}`;
