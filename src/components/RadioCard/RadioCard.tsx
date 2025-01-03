import { useCallback, useRef, useState } from 'react';

import type { IRadioCardThemeFactory } from './RadioCard.css';
import type { IRadioCardFactory } from './RadioCard.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { isFunction } from '~/helpers/isFunction';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Card } from '../Card';
import { Labeled, useLabeledContext } from '../Labeled';
import { useRadioGroupContext } from '../RadioGroup';
import { RadioIndicator } from '../RadioIndicator';
import { RadioCardTheme } from './RadioCard.css';

const COMPONENT_NAME = 'RadioCard';

export const RadioCard = componentFactory<IRadioCardFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'outlined',
      required: requiredProp,
      disabled,
      checked: checkedProp,
      onChange,
      readOnly: readOnlyProp,
      loading: loadingProp,
      name: nameProp,
      value,
      id: idProp,
      rootRef,
      label,
      supportingText,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const radioCardGroupContext = useRadioGroupContext();
    const [handlingChange, setHandlingChange] = useState(false);

    const loading =
      loadingProp ||
      handlingChange ||
      labeledContext?.loading ||
      (radioCardGroupContext?.loading &&
        radioCardGroupContext.nextValue === value);
    const readOnly =
      (readOnlyProp ?? labeledContext?.readOnly) ||
      labeledContext?.loading ||
      radioCardGroupContext?.loading ||
      loading;
    const disabledOrReadOnly = disabled || labeledContext?.disabled || readOnly;
    const required = requiredProp ?? labeledContext?.required;
    const id = idProp ?? labeledContext?.id;

    const name = radioCardGroupContext?.name ?? nameProp;
    const checked = radioCardGroupContext
      ? radioCardGroupContext.value !== undefined &&
        radioCardGroupContext.value === value
      : checkedProp;

    const { getStyles } = useComponentTheme<IRadioCardThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: RadioCardTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        loading,
        checked,
      },
    });

    const inputRef = useRef<HTMLInputElement>(null);
    const handleRef = useMergeRefs(inputRef, forwardedRef);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          if (handlingChange) {
            return;
          }

          void executeLazyPromise(
            () =>
              Promise.all([
                radioCardGroupContext?.onChange?.(
                  event,
                  event.target.checked ? event.target.value : undefined,
                ),
                onChange?.(
                  event,
                  event.target.checked ? event.target.value : undefined,
                ),
              ]),
            setHandlingChange,
          );
        },
        [handlingChange, onChange, radioCardGroupContext],
      );

    const handleKeyDown: React.KeyboardEventHandler = (event) => {
      if (
        ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(
          event.nativeEvent.code,
        )
      ) {
        event.preventDefault();

        const siblings = Array.from(
          document.querySelectorAll<HTMLButtonElement>(
            `[role="radio"][name="${name}"]:not(:disabled):not([data-disabled])`,
          ),
        );

        const currentIndex = siblings.findIndex(
          (element) => element === event.target,
        );
        const nextIndex =
          currentIndex + 1 >= siblings.length ? 0 : currentIndex + 1;
        const prevIndex =
          currentIndex - 1 < 0 ? siblings.length - 1 : currentIndex - 1;

        if (event.nativeEvent.code === 'ArrowDown') {
          siblings[nextIndex].focus();
          siblings[nextIndex].click();
        }

        if (event.nativeEvent.code === 'ArrowUp') {
          siblings[prevIndex].focus();
          siblings[prevIndex].click();
        }

        if (event.nativeEvent.code === 'ArrowLeft') {
          siblings[prevIndex].focus();
          siblings[prevIndex].click();
        }

        if (event.nativeEvent.code === 'ArrowRight') {
          siblings[nextIndex].focus();
          siblings[nextIndex].click();
        }
      }
    };

    return (
      <Card
        {...getStyles('root')}
        as="button"
        ref={rootRef}
        onClick={() => inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        variant={variant}
        role="radio"
        name={name}
        {...other}
      >
        {children ? (
          isFunction(children) ? (
            children({ checked })
          ) : (
            children
          )
        ) : (
          <Card.Content>
            <Labeled
              labelPosition="right"
              label={label}
              disabled={disabledOrReadOnly}
            >
              <RadioIndicator
                checked={checked}
                loading={loading}
                disabled={disabledOrReadOnly}
              />
            </Labeled>

            {supportingText && (
              <div {...getStyles('supportingText')}>{supportingText}</div>
            )}
          </Card.Content>
        )}

        <input
          name={name}
          type="radio"
          checked={checked}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          value={value}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          ref={handleRef}
          hidden
        />
      </Card>
    );
  },
);

RadioCard.theme = RadioCardTheme;
RadioCard.displayName = `@sixui/${COMPONENT_NAME}`;
RadioCard.Indicator = RadioIndicator;
