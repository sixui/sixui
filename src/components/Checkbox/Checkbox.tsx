import {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { useVisualState } from '~/components/VisualState';
import { usePrevious } from '~/hooks/usePrevious';
import { useControlledValue } from '~/hooks/useControlledValue';
import { StateLayer } from '~/components/StateLayer';
import { FocusRing } from '~/components/FocusRing';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { LabeledContext } from '~/components/Labeled';
import {
  CHECKBOX_DEFAULT_TAG,
  type ICheckboxOwnProps,
  type ICheckboxProps,
} from './Checkbox.types';
import {
  checkboxFocusRingStyles,
  checkboxStateLayerStyles,
  checkboxStyles,
} from './Checkbox.styles';
import { checkboxTheme } from './Checkbox.stylex';

// https://github.com/material-components/material-web/blob/main/checkbox/internal/checkbox.ts

type ICheckbox = <
  TRoot extends React.ElementType = typeof CHECKBOX_DEFAULT_TAG,
>(
  props: ICheckboxProps<TRoot>,
) => React.ReactNode;

export const Checkbox: ICheckbox = forwardRef(function Checkbox<
  TRoot extends React.ElementType = typeof CHECKBOX_DEFAULT_TAG,
>(props: ICheckboxProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = CHECKBOX_DEFAULT_TAG,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    onChange,
    indeterminate: indeterminateProp,
    defaultIndeterminate,
    checked: checkedProp,
    defaultChecked,
    loading: loadingProp,
    'data-cy': dataCy = 'checkbox',
    softDisabled: softDisabledProp,
    ...other
  } = props as IWithAsProp<ICheckboxOwnProps>;

  const labeledContext = useContext(LabeledContext);
  const actionRef = useRef<HTMLInputElement>(null);
  const [handlingChange, setHandlingChange] = useState(false);
  const loading = loadingProp || handlingChange || labeledContext?.loading;
  const softDisabled =
    softDisabledProp || loading || labeledContext?.softDisabled;
  const visuallyDisabled =
    other.disabled || labeledContext?.disabled || softDisabled;

  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled: visuallyDisabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef, actionRef]);

  const componentTheme = useComponentTheme('Checkbox');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(checkboxStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const [checkedValue, setCheckedValue] = useControlledValue({
    controlled: checkedProp,
    default: !!defaultChecked,
    name: 'Checkbox',
    state: 'checked',
  });
  const [indeterminate, setIndeterminate] = useControlledValue({
    controlled: indeterminateProp,
    default: !!defaultIndeterminate,
    name: 'Checkbox',
    state: 'indeterminate',
  });

  const checked = checkedValue && !indeterminate;
  const selected = checked || indeterminate;
  const unselected = !selected;

  const wasChecked = usePrevious(checked) ?? false;
  const wasIndeterminate = usePrevious(indeterminate) ?? false;
  const wasVisuallyDisabled = usePrevious(!!visuallyDisabled);

  const prevNone = !wasChecked && !wasIndeterminate;
  const prevUnselected = prevNone;
  const prevChecked = wasChecked && !wasIndeterminate;
  const prevIndeterminate = wasIndeterminate;
  const prevDisabled = wasVisuallyDisabled;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
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
    <div
      {...sxf(
        checkboxTheme,
        componentTheme.overridenStyles,
        'container',
        selected && 'container$selected',
        visuallyDisabled && 'container$disabled',
        sx,
      )}
    >
      <Component
        type='checkbox'
        aria-checked={indeterminate ? 'mixed' : undefined}
        checked={checkedValue}
        onChange={handleChange}
        data-cy={dataCy}
        id={labeledContext?.id}
        required={labeledContext?.required}
        {...other}
        {...sxf('input')}
        ref={handleRef}
      />

      {loading ? (
        <IndeterminateCircularProgressIndicator
          styles={innerStyles?.circularProgressIndicator}
          disabled
        />
      ) : (
        <>
          <div
            {...sxf(
              'overlay',
              'outline',
              visuallyDisabled &&
                (selected ? 'outline$disabled$selected' : 'outline$disabled'),
            )}
          />
          <div
            {...sxf(
              'overlay',
              'background',
              'backgroundAndIcon',
              selected && 'backgroundAndIcon$selected',
              visuallyDisabled &&
                (selected
                  ? 'background$disabled$selected'
                  : 'background$disabled'),
              prevDisabled && 'background$prevDisabled',
            )}
          />

          <StateLayer
            for={actionRef}
            styles={[
              checkboxStateLayerStyles,
              ...asArray(innerStyles?.stateLayer),
            ]}
            disabled={visuallyDisabled}
            visualState={visualState}
          />
          {visuallyDisabled ? null : (
            <FocusRing
              for={actionRef}
              styles={[
                checkboxFocusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              visualState={visualState}
            />
          )}

          <svg
            {...sxf(
              'overlay',
              'icon',
              visuallyDisabled && 'icon$disabled',
              prevDisabled && 'icon$prevDisabled',
              'backgroundAndIcon',
              selected && 'backgroundAndIcon$selected',
            )}
            viewBox='0 0 18 18'
            aria-hidden
          >
            <rect
              {...sxf(
                'mark',
                'mark$short',
                selected && 'mark$selected',
                visuallyDisabled && 'mark$disabled',
                prevDisabled && 'mark$prevDisabled',
                prevUnselected && 'mark$prevUnselected',
                (checked || (prevChecked && unselected)) && [
                  'checkMark',
                  'checkMark$short',
                ],
                (indeterminate || (prevIndeterminate && unselected)) &&
                  'indeterminate',
              )}
            />
            <rect
              {...sxf(
                'mark',
                'mark$long',
                selected && 'mark$selected',
                visuallyDisabled && 'mark$disabled',
                prevDisabled && 'mark$prevDisabled',
                prevUnselected && 'mark$prevUnselected',
                (checked || (prevChecked && unselected)) && [
                  'checkMark',
                  'checkMark$long',
                ],
                (indeterminate || (prevIndeterminate && unselected)) &&
                  'indeterminate',
                prevUnselected && checked && 'mark$long$prevUnselected$checked',
              )}
            />
          </svg>
        </>
      )}
    </div>
  );
});
