import type { IRadioThemeFactory } from './Radio.css';
import type { IRadioFactory } from './Radio.types';
import { Box } from '~/components/Box';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer, useStateLayer } from '~/components/StateLayer';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { useRadio } from '~/hooks/useRadio';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Radio.constants';
import { RadioCard } from './RadioCard';
import { RadioGroup } from './RadioGroup';
import { RadioIndicator } from './RadioIndicator';
import { RadioTheme } from './Radio.css';

export const Radio = componentFactory<IRadioFactory>((props, forwardedRef) => {
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
  });

  const disabledOrReadOnly = disabled || readOnly;

  const stateLayer = useStateLayer<HTMLInputElement>({
    baseState: interactions,
    disabled: disabledOrReadOnly,
  });
  const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

  const { getStyles } = useComponentTheme<IRadioThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: RadioTheme,
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
});

Radio.theme = RadioTheme;
Radio.displayName = `@sixui/${COMPONENT_NAME}`;
Radio.Group = RadioGroup;
Radio.Indicator = RadioIndicator;
Radio.Card = RadioCard;
