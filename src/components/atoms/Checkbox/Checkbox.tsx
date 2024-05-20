import { forwardRef, useCallback, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  ICheckboxStyleKey,
  ICheckboxStyleVarKey,
} from './Checkbox.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState, type IVisualState } from '@/hooks/useVisualState';
import { usePrevious } from '@/hooks/usePrevious';
import { useControlledValue } from '@/hooks/useControlledValue';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import { useForkRef } from '@/hooks/useForkRef';
import {
  IndeterminateCircularProgressIndicator,
  type ICircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';

// https://github.com/material-components/material-web/blob/main/checkbox/internal/checkbox.ts

const DEFAULT_TAG = 'input';

export type ICheckboxOwnProps = IContainerProps<ICheckboxStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    circularProgressIndicator?: IZeroOrMore<
      ICompiledStyles<ICircularProgressIndicatorStyleKey>
    >;
  };
  visualState?: IVisualState;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => IMaybeAsync<IAny>;
  loading?: boolean;
};

export type ICheckboxProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ICheckboxOwnProps>;

type ICheckbox = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: ICheckboxProps<TRoot>,
) => React.ReactNode;

export const Checkbox: ICheckbox = forwardRef(function Checkbox<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: ICheckboxProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = DEFAULT_TAG,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    disabled: disabledProp,
    readOnly,
    onChange,
    indeterminate,
    checked: checkedProp,
    defaultChecked,
    loading,
    'data-cy': dataCy = 'checkbox',
    ...other
  } = props as IWithAsProp<ICheckboxOwnProps>;

  const actionRef = useRef<HTMLInputElement>(null);
  const disabled = disabledProp || readOnly || loading;
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref, visualStateRef, actionRef);

  const { theme } = useComponentTheme('Checkbox');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ICheckboxStyleKey, ICheckboxStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const [checkedValue, setCheckedValue] = useControlledValue({
    controlled: checkedProp,
    default: !!defaultChecked,
    name: 'Checkbox',
  });
  const checked = checkedValue && !indeterminate;
  const selected = checked || indeterminate;
  const unselected = !selected;

  const wasChecked = usePrevious(checked) ?? false;
  const wasIndeterminate = usePrevious(indeterminate) ?? false;
  const wasDisabled = usePrevious(disabled) ?? false;

  const prevNone = !wasChecked && !wasIndeterminate;
  const prevUnselected = prevNone;
  const prevChecked = wasChecked && !wasIndeterminate;
  const prevIndeterminate = wasIndeterminate;
  const prevDisabled = wasDisabled;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      Promise.resolve(onChange?.(event, event.target.checked))
        .finally(() => setCheckedValue(!event.target.checked))
        .catch((error: Error) => {
          throw error;
        });
    },
    [onChange, setCheckedValue],
  );

  const handleClick: React.MouseEventHandler<HTMLInputElement> = (event) =>
    event.preventDefault();

  return (
    <div
      {...sxf(
        'host',
        selected && 'host$selected',
        disabled && 'host$disabled',
        theme.vars,
        sx,
      )}
    >
      <div {...sxf('container')}>
        <Component
          {...sxf('input')}
          ref={handleRef}
          type='checkbox'
          aria-checked={indeterminate ? 'mixed' : undefined}
          disabled={disabled}
          checked={checkedValue}
          onChange={handleChange}
          onClick={handleClick}
          data-cy={dataCy}
          {...other}
        />

        {loading ? (
          <IndeterminateCircularProgressIndicator
            styles={[
              theme.circularProgressIndicatorStyles,
              ...asArray(innerStyles?.circularProgressIndicator),
            ]}
            disabled
          />
        ) : (
          <>
            <div
              {...sxf(
                'overlay',
                'outline',
                disabled &&
                  (selected ? 'outline$disabled$selected' : 'outline$disabled'),
              )}
            />
            <div
              {...sxf(
                'overlay',
                'background',
                'backgroundAndIcon',
                selected && 'backgroundAndIcon$selected',
                disabled &&
                  (selected
                    ? 'background$disabled$selected'
                    : 'background$disabled'),
                prevDisabled && 'background$prevDisabled',
              )}
            />

            <StateLayer
              for={actionRef}
              styles={[
                theme.stateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              disabled={disabled}
              visualState={visualState}
            />
            <FocusRing
              for={actionRef}
              styles={[
                theme.focusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              visualState={visualState}
            />

            <svg
              {...sxf(
                'overlay',
                'icon',
                disabled && 'icon$disabled',
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
                  disabled && 'mark$disabled',
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
                  disabled && 'mark$disabled',
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
    </div>
  );
});
