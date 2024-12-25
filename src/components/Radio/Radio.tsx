import { useCallback, useState } from 'react';

import type { IRadioThemeFactory } from './Radio.css';
import type { IRadioFactory } from './Radio.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { FocusRing } from '../FocusRing';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { useLabeledContext } from '../Labeled';
import { PaperBase } from '../PaperBase';
import { useRadioGroupContext } from '../RadioGroup';
import { StateLayer, useStateLayer } from '../StateLayer';
import { RadioTheme } from './Radio.css';

const COMPONENT_NAME = 'Radio';

export const Radio = componentFactory<IRadioFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
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
    (readOnlyProp ?? labeledContext?.readOnly) ||
    labeledContext?.loading ||
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
    <PaperBase
      {...getStyles('root')}
      classNames={classNames}
      interactions={stateLayer.interactionsContext.state}
      ref={rootRef}
      {...other}
    >
      <StateLayer {...getStyles('stateLayer')} context={stateLayer} />

      {!disabledOrReadOnly && (
        <FocusRing
          {...getStyles('focusRing')}
          interactions={stateLayer.interactionsContext.state}
        />
      )}

      {loading && (
        <IndeterminateCircularProgressIndicator
          {...getStyles('progressIndicator')}
          disabled={disabledOrReadOnly}
        />
      )}

      <svg {...getStyles('icon')} viewBox="0 0 20 20">
        <circle
          {...getStyles(['circle', 'circle$inner'])}
          cx="10"
          cy="10"
          r="5"
        />
      </svg>

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
    </PaperBase>
  );
});

Radio.theme = RadioTheme;
Radio.displayName = `@sixui/${COMPONENT_NAME}`;
