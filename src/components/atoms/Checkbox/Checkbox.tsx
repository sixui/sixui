import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type {
  ICheckboxStyleKey,
  ICheckboxStyleVarKey,
} from './Checkbox.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { usePrevious } from '@/hooks/usePrevious';
import { useControlled } from '@/hooks/useControlled';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';

// https://github.com/material-components/material-web/blob/main/checkbox/internal/checkbox.ts

export interface ICheckboxProps
  extends IContainer<ICheckboxStyleKey, ICheckboxStyleVarKey>,
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      | 'required'
      | 'disabled'
      | 'checked'
      | 'name'
      | 'value'
      | 'aria-label'
      | 'aria-checked'
      | 'aria-invalid'
    > {
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => IMaybeAsync<IAny>;
  rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
  focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  disabled,
  required,
  onChange,
  name,
  value,
  ...props
}) => {
  const theme = useComponentTheme('Checkbox');

  const hostRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const visualState = accumulate(useVisualState(hostRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ICheckboxStyleKey, ICheckboxStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
      ),
    [theme.styles, props.styles],
  );

  const indeterminate = props.indeterminate;
  const [checkedValue, setCheckedValue] = useControlled({
    controlled: props.checked,
    default: !!props.defaultChecked,
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
    React.useCallback(
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
          props.sx,
        ],
        [theme.vars, props.theme],
      )}
    >
      <div {...styleProps(['container'])}>
        <input
          {...styleProps(['input'])}
          ref={inputRef}
          type='checkbox'
          aria-checked={indeterminate ? 'mixed' : undefined}
          aria-label={props['aria-label']}
          aria-invalid={props['aria-invalid']}
          disabled={disabled}
          name={name}
          value={value}
          required={required}
          checked={checkedValue}
          onChange={handleChange}
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
          for={inputRef}
          styles={[theme.focusRingStyles, ...asArray(props.focusRingStyles)]}
          visualState={visualState}
        />
        <Ripple
          for={inputRef}
          styles={[theme.rippleStyles, ...asArray(props.rippleStyles)]}
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
};
