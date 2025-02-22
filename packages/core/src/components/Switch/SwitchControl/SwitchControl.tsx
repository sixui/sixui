import type { ISwitchControlThemeFactory } from './SwitchControl.css';
import type { ISwitchControlFactory } from './SwitchControl.types';
import { Box } from '~/components/Box';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer, useStateLayer } from '~/components/StateLayer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { useSwitch } from '~/hooks/useSwitch';
import { componentFactory } from '~/utils/component/componentFactory';
import { SwitchIndicator } from '../SwitchIndicator';
import { COMPONENT_NAME } from './SwitchControl.constants';
import { basicTemplateTheme } from './SwitchControl.css';

/**
 * @see https://m3.material.io/components/switchControl/overview
 */
export const SwitchControl = componentFactory<ISwitchControlFactory>(
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
      onChange,
      required: requiredProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      loading: loadingProp,
      checkedIcon,
      uncheckedIcon,
      alwaysOn,
      id: idProp,
      value,
      rootRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const {
      loading,
      disabled,
      readOnly,
      required,
      checked,
      isOn,
      id,
      handleChange,
    } = useSwitch({
      componentName: COMPONENT_NAME,
      checked: checkedProp,
      defaultChecked,
      value,
      onChange,
      loading: loadingProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      alwaysOn,
      required: requiredProp,
      id: idProp,
    });

    const disabledOrReadOnly = disabled || readOnly;
    const hasIcon =
      loading || (checked && !!checkedIcon) || (!checked && !!uncheckedIcon);

    const stateLayer = useStateLayer<HTMLInputElement>({
      baseState: interactions,
      disabled: disabledOrReadOnly,
    });
    const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const { getStyles } = useComponentTheme<ISwitchControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: basicTemplateTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        checked,
        'with-icon': hasIcon,
        loading,
        on: isOn,
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
          <FocusRing
            {...getStyles('focusRing')}
            interactions={stateLayer.interactionsContext.state}
          />
        )}

        <SwitchIndicator
          checked={checked}
          loading={loading}
          disabled={disabledOrReadOnly}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          alwaysOn={alwaysOn}
          interactions={stateLayer.interactionsContext.state}
          stateLayer={
            <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
          }
        />

        <input
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={handleChange}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          ref={inputHandleRef}
          {...getStyles('input')}
          {...stateLayer.interactionsContext.triggerProps}
        />
      </Box>
    );
  },
);

SwitchControl.theme = basicTemplateTheme;
SwitchControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
