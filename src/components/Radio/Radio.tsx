import { forwardRef, useCallback, useContext, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { useId } from '~/hooks/useId';
import { useVisualState } from '~/components/VisualState';
import { StateLayer } from '~/components/StateLayer';
import { FocusRing } from '~/components/FocusRing';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { RadioGroupContext } from '~/components/RadioGroup';
import { LabeledContext } from '~/components/Labeled';
import {
  RADIO_DEFAULT_TAG,
  type IRadioProps,
  type IRadioOwnProps,
} from './Radio.types';
import {
  radioFocusRingStyles,
  radioStateLayerStyles,
  radioStyles,
} from './Radio.styles';
import { radioTheme } from './Radio.stylex';

// https://github.com/material-components/material-web/blob/main/radio/internal/radio.ts

type IRadio = <TRoot extends React.ElementType = typeof RADIO_DEFAULT_TAG>(
  props: IRadioProps<TRoot>,
) => React.ReactNode;

export const Radio: IRadio = forwardRef(function Radio<
  TRoot extends React.ElementType = typeof RADIO_DEFAULT_TAG,
>(props: IRadioProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = RADIO_DEFAULT_TAG,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    onChange,
    value,
    checked: checkedProp,
    name: nameProp,
    loading: loadingProp,
    'data-cy': dataCy = 'radio',
    softDisabled: softDisabledProp,
    ...other
  } = props as IWithAsProp<IRadioOwnProps>;

  const labeledContext = useContext(LabeledContext);
  const radioGroupContext = useContext(RadioGroupContext);
  const loading = loadingProp || labeledContext?.loading;
  const softDisabled =
    (softDisabledProp ?? labeledContext?.softDisabled) || loading;
  const visuallyDisabled =
    other.disabled || labeledContext?.disabled || softDisabled;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled: visuallyDisabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef, actionRef]);

  const componentTheme = useComponentTheme('Radio');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(radioStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  // Unique maskId is required because of a Safari bug that fail to persist
  // reference to the mask. This should be removed once the bug is fixed.
  const maskId = useId();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
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
    ? radioGroupContext.value !== undefined && radioGroupContext.value === value
    : checkedProp;
  return (
    <div
      {...sxf(
        radioTheme,
        componentTheme.overridenStyles,
        'host',
        visuallyDisabled && 'host$disabled',
        sx,
      )}
    >
      <div {...sxf('container', checked && 'container$checked')}>
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
              visualState={visualState}
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
          {...sxf(
            'icon',
            checked && 'icon$checked',
            visuallyDisabled &&
              (checked ? 'icon$checked$disabled' : 'icon$disabled'),
          )}
          viewBox='0 0 20 20'
        >
          {loading ? null : (
            <>
              <mask id={maskId}>
                <rect width='100%' height='100%' fill='white' />
                <circle cx='10' cy='10' r='8' fill='black' />
              </mask>
              <circle
                {...sxf('circle$outer', visuallyDisabled && 'circle$disabled')}
                cx='10'
                cy='10'
                r='10'
                mask={`url(#${maskId})`}
              />
            </>
          )}
          <circle
            {...sxf(
              'circle$inner',
              checked && 'circle$inner$checked',
              visuallyDisabled && 'circle$disabled',
            )}
            cx='10'
            cy='10'
            r='5'
          />
        </svg>

        <Component
          name={name}
          type='radio'
          checked={checked}
          onChange={handleChange}
          value={value}
          data-cy={`${dataCy}-${value}`}
          id={labeledContext?.id}
          {...other}
          {...sxf('input')}
          ref={handleRef}
        />
      </div>
    </div>
  );
});
