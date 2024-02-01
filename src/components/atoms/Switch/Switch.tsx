import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IIcon, IMaybeAsync } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { ISwitchStyleKey, ISwitchStyleVarKey } from './Switch.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { useControlled } from '@/hooks/useControlled';
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';
import { ReactComponent as CheckMark } from '@/assets/CheckMark.svg';
import { ReactComponent as XMark } from '@/assets/XMark.svg';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';

// https://github.com/material-components/material-web/blob/main/switch/internal/switch.ts

export interface ISwitchProps
  extends IContainer<ISwitchStyleKey, ISwitchStyleVarKey>,
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'disabled' | 'required' | 'aria-label'
    > {
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
  icon?: IIcon;
  selectedIcon?: IIcon;
}

export const Switch: React.FC<ISwitchProps> = ({
  required,
  loadingAnimation = 'progressIndicator',
  onChange,
  icon: Icon,
  selectedIcon: SelectedIcon,
  ...props
}) => {
  const {
    theme,
    styles,
    rippleStyles,
    focusRingStyles,
    circularProgressIndicatorStyles,
  } = useComponentTheme('Switch');

  const inputElRef = React.useRef<HTMLInputElement>(null);
  const [handlingChange, setHandlingChange] = React.useState(false);
  const visualState = accumulate(useVisualState(inputElRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ISwitchStyleKey, ISwitchStyleVarKey>(
        stylesCombinatorFactory(styles, props.styles),
        visualState,
      ),
    [styles, props.styles, visualState],
  );

  const [selected, setSelected] = useControlled({
    controlled: props.selected,
    default: !!props.defaultSelected,
    name: 'Switch',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
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
        ['host', disabled && 'host$disabled'],
        [theme, props.theme],
      )}
    >
      <div {...styleProps(['switch', selected && 'switch$selected'])}>
        <input
          {...styleProps(['input'])}
          ref={inputElRef}
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
          styles={focusRingStyles}
          for={inputElRef}
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
            <Ripple
              styles={rippleStyles}
              for={inputElRef}
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
                        styles={circularProgressIndicatorStyles}
                      />
                    ) : SelectedIcon ? (
                      <SelectedIcon aria-hidden />
                    ) : (
                      <CheckMark aria-hidden />
                    )}
                  </div>

                  {showOnlySelectedIcon ? null : (
                    <div
                      {...styleProps([
                        'icon',
                        !loading &&
                          (!selected ? 'icon$size$selected' : 'icon$size'),
                        !selected && 'icon$on',
                        !selected && disabled && 'icon$on$disabled',
                      ])}
                    >
                      {loading ? (
                        <IndeterminateCircularProgressIndicator
                          styles={circularProgressIndicatorStyles}
                        />
                      ) : Icon ? (
                        <Icon aria-hidden />
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
