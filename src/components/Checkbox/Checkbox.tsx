import { useCallback, useState } from 'react';

import type { ICheckboxThemeFactory } from './Checkbox.css';
import type { ICheckboxFactory } from './Checkbox.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { CheckboxCard } from '../CheckboxCard';
import { CheckboxIndicator } from '../CheckboxIndicator';
import { FocusRing } from '../FocusRing';
import { useLabeledContext } from '../Labeled';
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
      interactionsMergeStrategy,
      checked: checkedProp,
      defaultChecked,
      indeterminate: indeterminateProp,
      defaultIndeterminate,
      onChange,
      required: requiredProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      loading: loadingProp,
      id: idProp,
      value,
      rootRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useLabeledContext();
    const [handlingChange, setHandlingChange] = useState(false);
    const [checkedValue, setCheckedValue] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: COMPONENT_NAME,
    });
    const [indeterminate, setIndeterminate] = useControlledValue({
      controlled: indeterminateProp,
      default: !!defaultIndeterminate,
      name: COMPONENT_NAME,
    });

    const loading = loadingProp || handlingChange || labeledContext?.loading;
    const disabled = disabledProp || labeledContext?.disabled;
    const readOnly = readOnlyProp || loading || labeledContext?.readOnly;
    const required = requiredProp ?? labeledContext?.required;
    const id = idProp ?? labeledContext?.id;

    const disabledOrReadOnly = disabled || readOnly;

    const stateLayer = useStateLayer<HTMLInputElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: disabledOrReadOnly,
    });
    const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const checked = checkedValue && !indeterminate;

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
          ).finally(() => {
            setCheckedValue(!event.target.checked);
            setIndeterminate(false);
          });
        },
        [handlingChange, onChange, setCheckedValue, setIndeterminate],
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

        <CheckboxIndicator
          checked={checked}
          indeterminate={indeterminate}
          loading={loading}
          disabled={disabledOrReadOnly}
          interactions={stateLayer.interactionsContext.state}
        />

        <input
          type="checkbox"
          checked={checkedValue}
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
Checkbox.Indicator = CheckboxIndicator;
Checkbox.Card = CheckboxCard;
