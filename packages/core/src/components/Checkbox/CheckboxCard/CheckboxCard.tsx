import { useRef } from 'react';

import type { ICheckboxCardThemeFactory } from './CheckboxCard.css';
import type { ICheckboxCardFactory } from './CheckboxCard.types';
import { Card } from '~/components/Card';
import { Labeled } from '~/components/Labeled';
import { useCheckbox } from '~/hooks/useCheckbox';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { CheckboxIndicator } from '../CheckboxIndicator';
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
      indeterminate: indeterminateProp,
      defaultIndeterminate,
      value,
      onChange,
      loading: loadingProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      id: idProp,
      rootRef,
      label,
      supportingText,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const {
      loading,
      disabled,
      readOnly,
      required,
      checked,
      indeterminate,
      id,
      handleChange,
    } = useCheckbox({
      componentName: COMPONENT_NAME,
      checked: checkedProp,
      defaultChecked,
      indeterminate: indeterminateProp,
      defaultIndeterminate,
      value,
      onChange,
      loading: loadingProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      id: idProp,
    });

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
        {children ?? (
          <Card.Content>
            <Labeled
              labelPosition="right"
              label={label}
              disabled={disabledOrReadOnly}
            >
              <CheckboxIndicator
                checked={checked}
                indeterminate={indeterminate}
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
          onClick={(e) => {
            e.stopPropagation();
          }}
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
