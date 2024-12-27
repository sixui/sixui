import { useCallback, useState } from 'react';

import type { ICheckboxThemeFactory } from './Checkbox.css';
import type { ICheckboxFactory } from './Checkbox.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { usePrevious } from '~/hooks/usePrevious';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { FocusRing } from '../FocusRing';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { useLabeledContext } from '../Labeled';
import { PaperBase } from '../PaperBase';
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
      interactions,
      interactionsMergeStrategy,
      checked: checkedProp,
      defaultChecked,
      indeterminate: indeterminateProp,
      defaultIndeterminate,
      onChange,
      required: requiredProp,
      disabled,
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
    const readOnly = readOnlyProp || loading || labeledContext?.readOnly;
    const disabledOrReadOnly = disabled || labeledContext?.disabled || readOnly;
    const required = requiredProp ?? labeledContext?.required;
    const id = idProp ?? labeledContext?.id;
    const isInteractive = !!onChange;

    const stateLayer = useStateLayer<HTMLInputElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: disabledOrReadOnly || !isInteractive,
    });
    const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const checked = checkedValue && !indeterminate;
    const unchecked = !checkedValue && !indeterminate;
    const on = checkedValue || indeterminate;

    const wasUnchecked = usePrevious(unchecked) ?? false;

    const { getStyles } = useComponentTheme<ICheckboxThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: checkboxTheme,
      modifiers: {
        on,
        checked,
        indeterminate,
        'was-unchecked': wasUnchecked,
        loading,
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

        {loading ? (
          <IndeterminateCircularProgressIndicator
            {...getStyles('progressIndicator')}
            disabled={disabledOrReadOnly}
          />
        ) : (
          <>
            <div {...getStyles(['overlay', 'background'])} />
            <svg
              {...getStyles(['overlay', 'icon'])}
              viewBox="0 0 18 18"
              aria-hidden
            >
              <rect {...getStyles(['mark', 'mark$short'])} />
              <rect {...getStyles(['mark', 'mark$long'])} />
            </svg>
          </>
        )}

        {isInteractive && (
          <input
            type="checkbox"
            role="switch"
            checked={checkedValue}
            onChange={handleChange}
            id={id}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            ref={inputHandleRef}
            aria-checked={indeterminate ? 'mixed' : undefined}
            {...getStyles('input')}
            {...stateLayer.interactionsContext.triggerProps}
          />
        )}
      </PaperBase>
    );
  },
);

Checkbox.theme = checkboxTheme;
Checkbox.displayName = `@sixui/${COMPONENT_NAME}`;
