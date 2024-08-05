import { forwardRef, useCallback, useContext, useRef, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { ICheckboxProps } from './Checkbox.types';
import { useVisualState } from '../VisualState';
import { usePrevious } from '~/hooks/usePrevious';
import { useControlledValue } from '~/hooks/useControlledValue';
import { StateLayer } from '../StateLayer';
import { FocusRing } from '../FocusRing';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { LabeledContext } from '../Labeled';
import {
  checkboxFocusRingStyles,
  checkboxStateLayerStyles,
  checkboxStyles,
} from './Checkbox.styles';
import { checkboxTheme } from './Checkbox.stylex';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';

// https://github.com/material-components/material-web/blob/main/checkbox/internal/checkbox.ts

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  function Checkbox(props, forwardedRef) {
    const {
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
      softDisabled: softDisabledProp,
      ...other
    } = props;

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
    const handleRef = useMergeRefs([
      forwardedRef,
      setVisualStateRef,
      actionRef,
    ]);

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'Checkbox',
      styles: [checkboxStyles, styles],
    });

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
      <div
        {...getStyles(
          checkboxTheme,
          globalStyles,
          'container',
          selected && 'container$selected',
          visuallyDisabled && 'container$disabled',
          sx,
        )}
      >
        <Base
          component='input'
          data-cy='checkbox'
          type='checkbox'
          aria-checked={indeterminate ? 'mixed' : undefined}
          checked={checkedValue}
          onChange={handleChange}
          id={labeledContext?.id}
          required={labeledContext?.required}
          {...other}
          sx={combineStyles('input')}
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
              {...getStyles(
                'overlay',
                'outline',
                visuallyDisabled &&
                  (selected ? 'outline$disabled$selected' : 'outline$disabled'),
              )}
            />
            <div
              {...getStyles(
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
              {...getStyles(
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
                {...getStyles(
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
                {...getStyles(
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
                  prevUnselected &&
                    checked &&
                    'mark$long$prevUnselected$checked',
                )}
              />
            </svg>
          </>
        )}
      </div>
    );
  },
);
