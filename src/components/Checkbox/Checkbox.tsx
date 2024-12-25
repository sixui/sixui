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
    const [checked, setChecked] = useControlledValue({
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

    const stateLayer = useStateLayer<HTMLInputElement>({
      baseState: interactions,
      mergeStrategy: interactionsMergeStrategy,
      disabled: disabledOrReadOnly,
    });
    const inputHandleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    const checkedDeterminate = checked && !indeterminate;
    const checkedOrIndeterminate = checked || indeterminate;
    const uncheckedDeterminate = !checked && !indeterminate;

    const wasCheckedDeterminate = usePrevious(checkedDeterminate) ?? false;
    const wasIndeterminate = usePrevious(indeterminate) ?? false;
    const wasDisabledOrReadOnly = usePrevious(!!disabledOrReadOnly) ?? false;

    const prevNone = !wasCheckedDeterminate && !wasIndeterminate;
    const prevUncheckedDeterminate = prevNone;
    const prevCheckedDeterminate = wasCheckedDeterminate && !wasIndeterminate;
    const prevIndeterminate = wasIndeterminate;
    const prevDisabledOrReadOnly = wasDisabledOrReadOnly;

    const { getStyles } = useComponentTheme<ICheckboxThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: checkboxTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        'was-disabled': prevDisabledOrReadOnly,
        checked: checkedOrIndeterminate,
        'was-unchecked': prevUncheckedDeterminate,
        indeterminate,
        loading,
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
            setChecked(!event.target.checked);
            setIndeterminate(false);
          });
        },
        [handlingChange, onChange, setChecked, setIndeterminate],
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
              <rect
                {...getStyles([
                  'mark',
                  'mark$short',
                  (checkedDeterminate ||
                    (prevCheckedDeterminate && uncheckedDeterminate)) && [
                    'checkMark',
                    'checkMark$short',
                  ],
                  (indeterminate ||
                    (prevIndeterminate && uncheckedDeterminate)) &&
                    'indeterminate',
                ])}
              />
              <rect
                {...getStyles([
                  'mark',
                  'mark$long',
                  (checkedDeterminate ||
                    (prevCheckedDeterminate && uncheckedDeterminate)) && [
                    'checkMark',
                    'checkMark$long',
                  ],
                  (indeterminate ||
                    (prevIndeterminate && uncheckedDeterminate)) &&
                    'indeterminate',
                ])}
              />
            </svg>
          </>
        )}

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
          aria-checked={indeterminate ? 'mixed' : undefined}
          {...getStyles('input')}
          {...stateLayer.interactionsContext.triggerProps}
        />
      </PaperBase>
    );
  },
);

Checkbox.theme = checkboxTheme;
Checkbox.displayName = `@sixui/${COMPONENT_NAME}`;
