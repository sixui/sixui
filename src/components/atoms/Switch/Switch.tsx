import { useCallback, useMemo, useRef, useState } from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainerProps } from '@/components/utils/Container';
import type { ISwitchStyleKey, ISwitchStyleVarKey } from './Switch.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { useControlled } from '@/hooks/useControlled';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
import {
  IndeterminateCircularProgressIndicator,
  type ICircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';
import { ReactComponent as CheckMark } from '@/assets/CheckMark.svg';
import { ReactComponent as XMark } from '@/assets/XMark.svg';

// https://github.com/material-components/material-web/blob/main/switch/internal/switch.ts

export type ISwitchProps = IContainerProps<
  ISwitchStyleKey,
  ISwitchStyleVarKey
> &
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    'id' | 'name' | 'disabled' | 'required' | 'aria-label'
  > & {
    /**
     * Puts the switch in the selected state.
     */
    selected?: boolean;

    defaultSelected?: boolean;

    /**
     * Shows both the selected and deselected icons.
     */
    icons?: boolean;

    /**
     * Shows only the selected icon, and not the deselected icon. If `true`,
     * overrides the behavior of the `icons` property.
     */
    showOnlySelectedIcon?: boolean;

    loading?: boolean;
    loadingAnimation?: 'progressIndicator' | 'none';
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      enabled: boolean,
    ) => IMaybeAsync<IAny>;
    icon?: React.ReactNode;
    selectedIcon?: React.ReactNode;
    statelayerStyles?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
  };

export const Switch: React.FC<ISwitchProps> = ({
  id,
  name,
  required,
  loadingAnimation = 'progressIndicator',
  onChange,
  icon,
  selectedIcon,
  ...props
}) => {
  const theme = useComponentTheme('Switch');

  const inputRef = useRef<HTMLInputElement>(null);
  const [handlingChange, setHandlingChange] = useState(false);
  const visualState = accumulate(useVisualState(inputRef), props.visualState);

  const styleProps = useMemo(
    () =>
      stylePropsFactory<ISwitchStyleKey, ISwitchStyleVarKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        visualState,
      ),
    [theme.styles, props.styles, visualState],
  );

  const [selected, setSelected] = useControlled({
    controlled: props.selected,
    default: !!props.defaultSelected,
    name: 'Switch',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (handlingChange) {
        return;
      }

      setHandlingChange(true);

      Promise.resolve(onChange?.(event, !selected))
        .finally(() => {
          setHandlingChange(false);
          setSelected(!selected);
        })
        .catch((error: Error) => {
          throw error;
        });
    },
    [handlingChange, onChange, selected, setSelected],
  );

  const loading =
    (props.loading || handlingChange) &&
    loadingAnimation === 'progressIndicator';
  const disabled = props.disabled || loading;
  const icons = props.icons || loading;
  const showOnlySelectedIcon = !loading && props.showOnlySelectedIcon;
  const shouldShowIcons = icons || showOnlySelectedIcon;

  return (
    <div
      {...styleProps(
        ['host', disabled && 'host$disabled', props.sx],
        [theme.vars, props.theme],
      )}
    >
      <div {...styleProps(['switch', selected && 'switch$selected'])}>
        <input
          {...styleProps(['input'])}
          ref={inputRef}
          id={id}
          name={name}
          type='checkbox'
          role='switch'
          aria-label={props['aria-label']}
          checked={selected}
          readOnly={disabled}
          tabIndex={disabled ? -1 : 0}
          required={required}
          onChange={disabled ? undefined : handleChange}
        />
        <FocusRing
          styles={[theme.focusRingStyles, ...asArray(props.focusRingStyles)]}
          for={inputRef}
          visualState={visualState}
        />

        <span {...styleProps(['track'])}>
          <div
            {...styleProps([
              'background',
              disabled && 'background$disabled',
              'trackBackground',
              selected && 'trackBackground$selected',
              disabled &&
                (selected
                  ? 'trackBackground$disabled$selected'
                  : 'trackBackground$disabled'),
            ])}
          />
          <span
            {...styleProps([
              'handleContainer',
              selected && 'handleContainer$selected',
              disabled && 'handleContainer$disabled',
            ])}
          >
            <StateLayer
              styles={[
                theme.statelayerStyles,
                ...asArray(props.statelayerStyles),
              ]}
              for={inputRef}
              disabled={disabled}
              visualState={visualState}
            />
            <span
              {...styleProps([
                'handle',
                selected && 'handle$selected',
                loading && 'handle$loading',
                disabled &&
                  (selected ? 'handle$disabled$selected' : 'handle$disabled'),
                (showOnlySelectedIcon ? selected : icons) && 'handle$withIcon',
              ])}
            >
              <div
                {...styleProps([
                  'background',
                  'handleBackground',
                  selected && 'handleBackground$selected',
                  disabled &&
                    (selected
                      ? 'handleBackground$disabled$selected'
                      : 'handleBackground$disabled'),
                ])}
              />

              {shouldShowIcons ? (
                <div {...styleProps(['icons'])}>
                  <div
                    {...styleProps([
                      'icon',
                      !loading &&
                        (selected ? 'icon$size$selected' : 'icon$size'),
                      selected && 'icon$on$selected',
                      selected && disabled && 'icon$on$selected$disabled',
                    ])}
                  >
                    {loading ? (
                      <IndeterminateCircularProgressIndicator
                        styles={[
                          theme.circularProgressIndicatorStyles,
                          ...asArray(props.circularProgressIndicatorStyles),
                        ]}
                      />
                    ) : selectedIcon ? (
                      selectedIcon
                    ) : (
                      <CheckMark aria-hidden />
                    )}
                  </div>

                  {showOnlySelectedIcon ? null : (
                    <div
                      {...styleProps([
                        'icon',
                        !loading &&
                          (selected ? 'icon$size$selected' : 'icon$size'),
                        !selected && 'icon$on',
                        !selected && disabled && 'icon$on$disabled',
                      ])}
                    >
                      {loading ? (
                        <IndeterminateCircularProgressIndicator
                          styles={[
                            theme.circularProgressIndicatorStyles,
                            ...asArray(props.circularProgressIndicatorStyles),
                          ]}
                        />
                      ) : icon ? (
                        icon
                      ) : (
                        <XMark aria-hidden />
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};
