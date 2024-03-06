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
  ICheckboxStyleKey,
  ICheckboxStyleVarKey,
} from './Checkbox.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import { usePrevious } from '@/hooks/usePrevious';
import { useControlled } from '@/hooks/useControlled';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import { useForkRef } from '@/hooks/useForkRef';

// https://github.com/material-components/material-web/blob/main/checkbox/internal/checkbox.ts

export type ICheckboxProps = IContainerProps<ICheckboxStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  };
  visualState?: IVisualState;
  required?: boolean;
  disabled?: boolean;
  checked?: boolean;
  id?: string;
  name?: string;
  value?: string;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => IMaybeAsync<IAny>;
};

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>(
  function Checkbox(props, ref) {
    const {
      styles,
      sx,
      innerStyles,
      visualState: visualStateProp,
      disabled,
      onChange,
      indeterminate,
      checked: checkedProp,
      defaultChecked,
      ...other
    } = props;

    const buttonRef = useRef<HTMLInputElement>(null);
    const { visualState, ref: visualStateRef } = useVisualState(
      visualStateProp,
      { disabled },
    );
    const handleRef = useForkRef(ref, visualStateRef, buttonRef);

    const theme = useComponentTheme('Checkbox');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const styleProps = useMemo(
      () =>
        stylePropsFactory<ICheckboxStyleKey, ICheckboxStyleVarKey>(
          stylesCombinator,
          visualState,
        ),
      [stylesCombinator, visualState],
    );

    const [checkedValue, setCheckedValue] = useControlled({
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

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          Promise.resolve(onChange?.(event, !event.target.checked))
            .finally(() => {
              setCheckedValue(!event.target.checked);
            })
            .catch((error: Error) => {
              throw error;
            });
        },
        [onChange, setCheckedValue],
      );

    return (
      <div
        {...styleProps(
          [
            'host',
            selected && 'host$selected',
            disabled && 'host$disabled',
            sx,
          ],
          [theme.vars],
        )}
      >
        <div {...styleProps(['container'])}>
          <input
            {...styleProps(['input'])}
            ref={handleRef}
            type='checkbox'
            aria-checked={indeterminate ? 'mixed' : undefined}
            disabled={disabled}
            checked={checkedValue}
            onChange={handleChange}
            {...other}
          />

          <div
            {...styleProps([
              'overlay',
              'outline',
              disabled &&
                (selected ? 'outline$disabled$selected' : 'outline$disabled'),
            ])}
          />
          <div
            {...styleProps([
              'overlay',
              'background',
              'backgroundAndIcon',
              selected && 'backgroundAndIcon$selected',
              disabled &&
                (selected
                  ? 'background$disabled$selected'
                  : 'background$disabled'),
              prevDisabled && 'background$prevDisabled',
            ])}
          />

          <FocusRing
            for={buttonRef}
            styles={[theme.focusRingStyles, ...asArray(innerStyles?.focusRing)]}
            visualState={visualState}
          />
          <StateLayer
            for={buttonRef}
            styles={[
              theme.stateLayerStyles,
              ...asArray(innerStyles?.stateLayer),
            ]}
            disabled={disabled}
            visualState={visualState}
          />

          <svg
            {...styleProps([
              'overlay',
              'icon',
              disabled && 'icon$disabled',
              prevDisabled && 'icon$prevDisabled',
              'backgroundAndIcon',
              selected && 'backgroundAndIcon$selected',
            ])}
            viewBox='0 0 18 18'
            aria-hidden
          >
            <rect
              {...styleProps([
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
              ])}
            />
            <rect
              {...styleProps([
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
                prevUnselected && checked && 'mark$long$prevUnselected$checked',
              ])}
            />
          </svg>
        </div>
      </div>
    );
  },
);
