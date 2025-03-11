import type { ICheckboxControlThemeFactory } from './CheckboxControl.css';
import type { ICheckboxControlFactory } from './CheckboxControl.types';
import { Box } from '~/components/Box';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer, useStateLayer } from '~/components/StateLayer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useCheckbox } from '~/hooks/useCheckbox';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { CheckboxIndicator } from '../CheckboxIndicator';
import { COMPONENT_NAME } from './CheckboxControl.constants';
import { checkboxControlTheme } from './CheckboxControl.css';

/**
 * @see https://m3.material.io/components/checkboxControl/overview
 */
export const CheckboxControl = componentFactory<ICheckboxControlFactory>(
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

    const { getStyles } = useComponentTheme<ICheckboxControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: checkboxControlTheme,
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
        {!disabled && (
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

CheckboxControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
CheckboxControl.theme = checkboxControlTheme;
