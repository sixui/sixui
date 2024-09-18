import { useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { useFocus } from 'react-aria';

import type { ITextAreaFieldThemeFactory } from './TextAreaField.css';
import type { ITextAreaFieldFactory } from './TextAreaField.types';
import { iconXMark } from '~/assets/icons';
import { useControlledValue } from '~/hooks/useControlledValue';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { triggerChangeEvent } from '~/utils/triggerChangeEvent';
import { FieldBase } from '../FieldBase';
import { IconButton } from '../IconButton';
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
      onValueChange,
      clearable: clearableProp,
      clearIcon = <SvgIcon icon={iconXMark} />,
      onChange,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const disabledOrReadOnly = other.disabled || other.readOnly;

    const { getStyles } = useComponentTheme<ITextAreaFieldThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: textAreaFieldTheme,
      variant,
      modifiers: {
        disabled: disabledOrReadOnly,
        'with-error': !!other.hasError,
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
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const textAreaHandleRef = useMergeRefs([textAreaRef, forwardedRef]);
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

    const renderEndSection = (): JSX.Element | null =>
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
      <FieldBase<'textarea'>
        {...other}
        {...getStyles('root')}
        wrapperProps={{ onClick: handleClick }}
        classNames={classNames}
        interactions={{ focused, ...other.interactions }}
        populated={populated}
        variant={variant}
        end={renderEndSection()}
        multiline
      >
        {({ forwardedProps }) => (
          <textarea
            {...forwardedProps}
            {...focus.focusProps}
            {...getStyles('textarea')}
            placeholder={other.placeholder}
            disabled={other.disabled}
            readOnly={other.readOnly}
            value={value}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setValue(event.target.value);
              onChange?.(event);
            }}
            ref={textAreaHandleRef}
          />
        )}
      </FieldBase>
    );
  },
);

TextAreaField.theme = textAreaFieldTheme;
TextAreaField.displayName = `@sixui/${COMPONENT_NAME}`;
