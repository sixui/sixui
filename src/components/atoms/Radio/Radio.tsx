import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IRadioStyleKey, IRadioStyleVarKey } from './Radio.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useId } from '@/hooks/useId';
import { useVisualState } from '@/hooks/useVisualState';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import { useRadioGroupContext } from '../RadioGroup/useRadioGroupContext';

// https://github.com/material-components/material-web/blob/main/radio/internal/radio.ts

export type IRadioProps = IContainer<IRadioStyleKey, IRadioStyleVarKey> &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'id' | 'name' | 'required' | 'disabled' | 'checked' | 'aria-label'
  > & {
    value?: string;
    onChange?: (checked: boolean) => IMaybeAsync<IAny>;
    rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
    focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  };

export const Radio: React.FC<IRadioProps> = ({
  required,
  value,
  disabled,
  onChange,
  id,
  ...props
}) => {
  const theme = useComponentTheme('Radio');

  const hostRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const visualState = accumulate(useVisualState(hostRef), props.visualState);
  const radioGroupContext = useRadioGroupContext();

  // Unique maskId is required because of a Safari bug that fail to persist
  // reference to the mask. This should be removed once the bug is fixed.
  const maskId = useId();

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IRadioStyleKey, IRadioStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        Promise.resolve(
          radioGroupContext
            ? radioGroupContext?.onChange(value)
            : onChange?.(event.target.checked),
        ).catch((error: Error) => {
          throw error;
        });
      },
      [onChange, radioGroupContext, value],
    );

  const name = radioGroupContext?.name ?? props.name;
  const checked = !disabled
    ? radioGroupContext
      ? radioGroupContext.value !== undefined &&
        radioGroupContext.value === value
      : props.checked
    : false;

  return (
    <div
      {...styleProps(
        ['host', disabled && 'host$disabled', props.sx],
        [theme.vars, props.theme],
      )}
      ref={hostRef}
    >
      <div {...styleProps(['container', checked && 'container$checked'])}>
        <Ripple
          for={inputRef}
          styles={[theme.rippleStyles, ...asArray(props.rippleStyles)]}
          disabled={disabled}
          visualState={visualState}
        />
        <FocusRing
          for={inputRef}
          styles={[theme.focusRingStyles, ...asArray(props.focusRingStyles)]}
          visualState={visualState}
        />
        <svg
          {...styleProps([
            'icon',
            checked && 'icon$checked',
            disabled && (checked ? 'icon$checked$disabled' : 'icon$disabled'),
          ])}
          viewBox='0 0 20 20'
        >
          <mask id={maskId}>
            <rect width='100%' height='100%' fill='white' />
            <circle cx='10' cy='10' r='8' fill='black' />
          </mask>
          <circle
            {...styleProps(['circle$outer', disabled && 'circle$disabled'])}
            cx='10'
            cy='10'
            r='10'
            mask={`url(#${maskId})`}
          />
          <circle
            {...styleProps([
              'circle$inner',
              checked && 'circle$inner$checked',
              disabled && 'circle$disabled',
            ])}
            cx='10'
            cy='10'
            r='5'
          />
        </svg>

        <input
          {...styleProps(['input'])}
          ref={inputRef}
          id={id}
          name={name}
          type='radio'
          checked={checked}
          value={value}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          aria-label={props['aria-label']}
        />
      </div>
    </div>
  );
};
