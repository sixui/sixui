import { CheckboxGroup } from 'react-aria-components';

import type { ICheckboxThemeFactory } from './Checkbox.css';
import type { ICheckboxFactory } from './Checkbox.types';
import { useCheckbox } from '~/hooks/useCheckbox';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { CheckboxCard } from '../CheckboxCard';
import { CheckboxIndicator } from '../CheckboxIndicator';
import { FocusRing } from '../FocusRing';
import { StateLayer, useStateLayer } from '../StateLayer';
import { checkboxTheme } from './Checkbox.css';

const COMPONENT_NAME = 'Checkbox';

export const Checkbox = componentFactory<ICheckboxFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      interactions,
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

    const stateLayer = useStateLayer<HTMLInputElement>({
      baseState: interactions,
      disabled: disabledOrReadOnly,
    });
    const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const { getStyles } = useComponentTheme<ICheckboxThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: checkboxTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
      },
    });

    return (
      <Box
        {...getStyles('root')}
        interactions={stateLayer.interactionsContext.state}
        ref={rootRef}
        {...other}
      >
        {!disabledOrReadOnly && (
          <>
            <FocusRing
              {...getStyles('focusRing')}
              interactions={stateLayer.interactionsContext.state}
            />
            <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
          </>
        )}

        <CheckboxIndicator
          checked={checked}
          indeterminate={indeterminate}
          loading={loading}
          disabled={disabledOrReadOnly}
          interactions={stateLayer.interactionsContext.state}
        />

        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          ref={inputHandleRef}
          aria-checked={indeterminate ? 'mixed' : checked}
          {...getStyles('input')}
          {...stateLayer.interactionsContext.triggerProps}
        />
      </Box>
    );
  },
);

Checkbox.theme = checkboxTheme;
Checkbox.displayName = `@sixui/${COMPONENT_NAME}`;
Checkbox.Group = CheckboxGroup;
Checkbox.Indicator = CheckboxIndicator;
Checkbox.Card = CheckboxCard;
