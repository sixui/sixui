import type { IRadioControlThemeFactory } from './RadioControl.css';
import type { IRadioControlFactory } from './RadioControl.types';
import { Box } from '~/components/Box';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer, useStateLayer } from '~/components/StateLayer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { useRadio } from '~/hooks/useRadio';
import { componentFactory } from '~/utils/component/componentFactory';
import { RadioIndicator } from '../RadioIndicator';
import { COMPONENT_NAME } from './RadioControl.constants';
import { RadioControlTheme } from './RadioControl.css';

/**
 * @see https://m3.material.io/components/radioControl-button/overview
 */
export const RadioControl = componentFactory<IRadioControlFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      required: requiredProp,
      disabled: disabledProp,
      interactions,
      checked: checkedProp,
      onChange,
      readOnly: readOnlyProp,
      loading: loadingProp,
      name: nameProp,
      value,
      id: idProp,
      rootRef,
      hasError: hasErrorProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const {
      loading,
      disabled,
      readOnly,
      required,
      checked,
      id,
      handleChange,
      name,
      hasError,
    } = useRadio({
      checked: checkedProp,
      value,
      onChange,
      loading: loadingProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      required: requiredProp,
      id: idProp,
      name: nameProp,
      hasError: hasErrorProp,
    });

    const disabledOrReadOnly = disabled || readOnly;

    const stateLayer = useStateLayer<HTMLInputElement>({
      baseState: interactions,
      disabled: disabledOrReadOnly,
    });
    const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const { getStyles } = useComponentTheme<IRadioControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: RadioControlTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        loading,
        checked,
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

        <RadioIndicator
          checked={checked}
          loading={loading}
          disabled={disabledOrReadOnly}
          interactions={stateLayer.interactionsContext.state}
          hasError={hasError}
        />

        <input
          name={name}
          type="radio"
          checked={checked}
          onChange={handleChange}
          value={value}
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          ref={inputHandleRef}
          {...getStyles('input')}
          {...stateLayer.interactionsContext.triggerProps}
        />
      </Box>
    );
  },
);

RadioControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
RadioControl.theme = RadioControlTheme;
