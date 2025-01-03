import { useCallback, useRef, useState } from 'react';

import type { ICheckboxCardThemeFactory } from './CheckboxCard.css';
import type { ICheckboxCardFactory } from './CheckboxCard.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Card } from '../Card';
import { CheckboxIndicator } from '../CheckboxIndicator';
import { Labeled, useLabeledContext } from '../Labeled';
import { checkboxCardTheme } from './CheckboxCard.css';

const COMPONENT_NAME = 'CheckboxCard';

export const CheckboxCard = componentFactory<ICheckboxCardFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'outlined',
      checked: checkedProp,
      defaultChecked,
      onChange,
      required: requiredProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      loading: loadingProp,
      id: idProp,
      value,
      rootRef,
      label,
      supportingText,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const [handlingChange, setHandlingChange] = useState(false);
    const [checked, setChecked] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: COMPONENT_NAME,
    });

    const loading = loadingProp || handlingChange || labeledContext?.loading;
    const disabled = disabledProp || labeledContext?.disabled;
    const readOnly = readOnlyProp || loading || labeledContext?.readOnly;
    const required = requiredProp ?? labeledContext?.required;
    const id = idProp ?? labeledContext?.id;

    const disabledOrReadOnly = disabled || readOnly;

    const { getStyles } = useComponentTheme<ICheckboxCardThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: checkboxCardTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
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
              onChange?.(
                event,
                event.target.checked ? event.target.value : undefined,
              ) as void,
            setHandlingChange,
          ).finally(() => setChecked(!event.target.checked));
        },
        [handlingChange, onChange, setChecked],
      );

    return (
      <Card
        {...getStyles('root')}
        as="button"
        ref={rootRef}
        onClick={() => inputRef.current?.click()}
        variant={variant}
        role="checkbox"
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
            <Labeled labelPosition="right" label={label}>
              <CheckboxIndicator
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
          type="checkbox"
          checked={checked}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          ref={handleRef}
          aria-checked={checked}
          hidden
        />
      </Card>
    );
  },
);

CheckboxCard.theme = checkboxCardTheme;
CheckboxCard.displayName = `@sixui/${COMPONENT_NAME}`;
