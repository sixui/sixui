import { useCallback, useRef, useState } from 'react';

import type { IOptionCardThemeFactory } from './OptionCard.css';
import type { IOptionCardFactory } from './OptionCard.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Card } from '../Card';
import { Labeled, useLabeledContext } from '../Labeled';
import { useRadioGroupContext } from '../RadioGroup';
import { optionCardTheme } from './OptionCard.css';

const COMPONENT_NAME = 'OptionCard';

export const OptionCard = componentFactory<IOptionCardFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'outlined',
      control: Control,
      label,
      supportingText,
      children,
      checked: checkedProp,
      defaultChecked,
      value,
      onChange,
      required: requiredProp,
      disabled,
      readOnly: readOnlyProp,
      loading: loadingProp,
      id: idProp,
      rootRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const radioGroupContext = useRadioGroupContext();
    const [handlingChange, setHandlingChange] = useState(false);
    const [checkedValue, setCheckedValue] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: COMPONENT_NAME,
    });
    const controlRef = useRef<HTMLInputElement>(null);
    const controlHandleRef = useMergeRefs(controlRef, forwardedRef);

    const loading = loadingProp || handlingChange || labeledContext?.loading;
    const readOnly = readOnlyProp || loading || labeledContext?.readOnly;
    const disabledOrReadOnly = disabled || labeledContext?.disabled || readOnly;
    const required = requiredProp ?? labeledContext?.required;
    const id = idProp ?? labeledContext?.id;
    const checked = radioGroupContext
      ? radioGroupContext.value === value
      : checkedValue;

    const { getStyles } = useComponentTheme<IOptionCardThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: optionCardTheme,
      modifiers: {
        checked,
        disabled: disabledOrReadOnly,
      },
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          console.log('_____XXX', event.target.value);

          if (handlingChange) {
            return;
          }

          void executeLazyPromise(
            () =>
              Promise.all([
                radioGroupContext?.onChange?.(
                  event,
                  event.target.checked ? event.target.value : undefined,
                ),
                onChange?.(
                  event,
                  event.target.checked ? event.target.value : undefined,
                ),
              ]),
            setHandlingChange,
          ).finally(() => {
            setCheckedValue(!event.target.checked);
          });
        },
        [
          handlingChange,
          onChange,
          radioGroupContext,
          setHandlingChange,
          setCheckedValue,
        ],
      );

    return (
      <Card
        {...getStyles('root')}
        onClick={(event) => {
          // FIXME:
          // console.log('_____', controlRef.current, event.currentTarget);
          // controlRef.current?.click();
        }}
        classNames={classNames}
        ref={rootRef}
        {...other}
        as="div"
      >
        {!Control && (
          <input
            type={radioGroupContext ? 'radio' : 'checkbox'}
            role="switch"
            name={radioGroupContext?.name}
            checked={checked}
            onChange={handleChange}
            id={id}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            ref={controlHandleRef}
            aria-checked={checked}
            hidden
            {...getStyles('input')}
          />
        )}

        <Card.Content>
          <Labeled
            labelPosition="right"
            label={label}
            supportingText={supportingText}
            disabled={disabledOrReadOnly}
          >
            {Control && (
              <Control
                nonInteractive
                name={radioGroupContext?.name}
                checked={checked}
                onChange={handleChange}
                id={id}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                value={value}
                ref={controlHandleRef}
                loading={loading}
              />
            )}
          </Labeled>

          {children ? (
            <div {...getStyles('text')}>
              {isFunction(children) ? children({ checked }) : children}
            </div>
          ) : null}
        </Card.Content>
      </Card>
    );
  },
);

OptionCard.theme = optionCardTheme;
OptionCard.displayName = `@sixui/${COMPONENT_NAME}`;
