import { forwardRef, useCallback, useContext, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type { IRadioProps } from './Radio.types';
import { useId } from '~/hooks/useId';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';
import { FocusRing } from '../FocusRing';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { LabeledContext } from '../Labeled';
import { RadioGroupContext } from '../RadioGroup';
import { StateLayer } from '../StateLayer';
import { useVisualState } from '../VisualState';
import {
  radioFocusRingStyles,
  radioStateLayerStyles,
  radioStyles,
} from './Radio.styles';
import { radioTheme } from './Radio.stylex';

// https://github.com/material-components/material-web/blob/main/radio/internal/radio.ts

export const Radio = forwardRef<HTMLInputElement, IRadioProps>(
  function Radio(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      visualState: visualStateProp,
      onChange,
      value,
      checked: checkedProp,
      name: nameProp,
      loading: loadingProp,
      readOnly: readOnlyProp,
      ...other
    } = props;

    const labeledContext = useContext(LabeledContext);
    const radioGroupContext = useContext(RadioGroupContext);
    const loading = loadingProp || labeledContext?.loading;
    const readOnly = (readOnlyProp ?? labeledContext?.readOnly) || loading;
    const visuallyDisabled =
      other.disabled || labeledContext?.disabled || readOnly;

    const actionRef = useRef<HTMLInputElement>(null);
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
      componentName: 'Radio',
      styles: [radioStyles, styles],
    });

    // Unique maskId is required because of a Safari bug that fail to persist
    // reference to the mask. This should be removed once the bug is fixed.
    const maskId = useId();

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          Promise.resolve(
            radioGroupContext
              ? radioGroupContext?.onChange?.(event, value)
              : onChange?.(event, event.target.value),
          ).catch((error: Error) => {
            throw error;
          });
        },
        [onChange, radioGroupContext, value],
      );

    const name = radioGroupContext?.name ?? nameProp;
    const checked = radioGroupContext
      ? radioGroupContext.value !== undefined &&
        radioGroupContext.value === value
      : checkedProp;

    return (
      <Base
        sx={[
          radioTheme,
          globalStyles,
          combineStyles('host', visuallyDisabled && 'host$disabled'),
          sx,
        ]}
      >
        <div {...getStyles('container', checked && 'container$checked')}>
          {loading ? (
            <IndeterminateCircularProgressIndicator
              styles={innerStyles?.circularProgressIndicator}
              disabled
            />
          ) : (
            <>
              <StateLayer
                for={actionRef}
                styles={[
                  radioStateLayerStyles,
                  ...asArray(innerStyles?.stateLayer),
                ]}
                disabled={visuallyDisabled}
                interactionState={visualState}
              />
              {visuallyDisabled ? null : (
                <FocusRing
                  for={actionRef}
                  styles={[
                    radioFocusRingStyles,
                    ...asArray(innerStyles?.focusRing),
                  ]}
                  visualState={visualState}
                />
              )}
            </>
          )}

          <svg
            {...getStyles(
              'icon',
              checked && 'icon$checked',
              visuallyDisabled &&
                (checked ? 'icon$checked$disabled' : 'icon$disabled'),
            )}
            viewBox="0 0 20 20"
          >
            {loading ? null : (
              <>
                <mask id={maskId}>
                  <rect width="100%" height="100%" fill="white" />
                  <circle cx="10" cy="10" r="8" fill="black" />
                </mask>
                <circle
                  {...getStyles(
                    'circle$outer',
                    visuallyDisabled && 'circle$disabled',
                  )}
                  cx="10"
                  cy="10"
                  r="10"
                  mask={`url(#${maskId})`}
                />
              </>
            )}
            <circle
              {...getStyles(
                'circle$inner',
                checked && 'circle$inner$checked',
                visuallyDisabled && 'circle$disabled',
              )}
              cx="10"
              cy="10"
              r="5"
            />
          </svg>

          <Base
            as="input"
            name={name}
            type="radio"
            checked={checked}
            onChange={handleChange}
            value={value}
            data-cy={`radio-${value}`}
            id={labeledContext?.id}
            {...other}
            sx={combineStyles('input')}
            ref={handleRef}
          />
        </div>
      </Base>
    );
  },
);
