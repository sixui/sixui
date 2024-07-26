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
    disabled: disabledProp,
    readOnly,
    value,
    checked: checkedProp,
    name: nameProp,
    loading,
    'data-cy': dataCy = 'radio',
    ...other
  } = props as IWithAsProp<IRadioOwnProps>;

  const radioGroupContext = useContext(RadioGroupContext);
  const disabled =
    (disabledProp ?? radioGroupContext?.disabled) ||
    (readOnly ?? radioGroupContext?.readOnly) ||
    loading;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled },
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
        disabled && 'host$disabled',
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
              disabled={disabled}
              visualState={visualState}
            />
            <FocusRing
              for={actionRef}
              styles={[
                radioFocusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              visualState={visualState}
            />
          </>
        )}

        <svg
          {...sxf(
            'icon',
            checked && 'icon$checked',
            disabled && (checked ? 'icon$checked$disabled' : 'icon$disabled'),
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
                {...sxf('circle$outer', disabled && 'circle$disabled')}
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
              disabled && 'circle$disabled',
            )}
            cx='10'
            cy='10'
            r='5'
          />
        </svg>

        <Component
          {...sxf('input')}
          ref={handleRef}
          name={name}
          type='radio'
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          data-cy={`${dataCy}-${value}`}
          {...other}
        />
      </div>
    </div>
  );
});
