import { useCallback, useState } from 'react';

import type { IRadioThemeFactory } from './Radio.css';
import type { IRadioFactory } from './Radio.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { FocusRing } from '../FocusRing';
import { useLabeledContext } from '../Labeled';
import { RadioCard } from '../RadioCard';
import { RadioGroup, useRadioGroupContext } from '../RadioGroup';
import { RadioIndicator } from '../RadioIndicator';
import { StateLayer, useStateLayer } from '../StateLayer';
import { RadioTheme } from './Radio.css';

const COMPONENT_NAME = 'Radio';

export const Radio = componentFactory<IRadioFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant,
    required: requiredProp,
    disabled,
    interactions,
    interactionsMergeStrategy,
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

  const labeledContext = useLabeledContext();
  const radioGroupContext = useRadioGroupContext();
  const [handlingChange, setHandlingChange] = useState(false);

  const loading =
    loadingProp ||
    handlingChange ||
    labeledContext?.loading ||
    (radioGroupContext?.loading && radioGroupContext.nextValue === value);
  const readOnly =
    readOnlyProp ||
    labeledContext?.readOnly ||
    radioGroupContext?.loading ||
    loading;
  const disabledOrReadOnly = disabled || labeledContext?.disabled || readOnly;
  const required = requiredProp ?? labeledContext?.required;
  const id = idProp ?? labeledContext?.id;

  const name = radioGroupContext?.name ?? nameProp;
  const checked = radioGroupContext
    ? radioGroupContext.value !== undefined && radioGroupContext.value === value
    : checkedProp;

  const stateLayer = useStateLayer<HTMLInputElement>({
    baseState: interactions,
    mergeStrategy: interactionsMergeStrategy,
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

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
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
      );
    },
    [handlingChange, onChange, radioGroupContext],
  );

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
