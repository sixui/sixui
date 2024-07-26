import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { useVisualState } from '~/components/VisualState';
import { useControlledValue } from '~/hooks/useControlledValue';
import { FocusRing } from '~/components/FocusRing';
import { StateLayer } from '~/components/StateLayer';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { SvgIcon } from '~/components/SvgIcon';
import { iconCheckMark, iconXMark } from '~/assets/icons';
import {
  SWITCH_DEFAULT_TAG,
  type ISwitchOwnProps,
  type ISwitchProps,
} from './Switch.types';
import { switchTheme } from './Switch.stylex';
import {
  switchCircularProgressIndicatorStyles,
  switchFocusRingStyles,
  switchStateLayerStyles,
  switchStyles,
} from './Switch.styles';

// https://github.com/material-components/material-web/blob/main/switch/internal/switch.ts

type ISwitch = <TRoot extends React.ElementType = typeof SWITCH_DEFAULT_TAG>(
  props: ISwitchProps<TRoot>,
) => React.ReactNode;

export const Switch: ISwitch = forwardRef(function Switch<
  TRoot extends React.ElementType = typeof SWITCH_DEFAULT_TAG,
>(props: ISwitchProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = SWITCH_DEFAULT_TAG,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    readOnly,
    loading: loadingProp,
    icons,
    showOnlySelectedIcon: showOnlySelectedIconProp,
    loadingAnimation = 'progressIndicator',
    onChange,
    icon,
    selectedIcon,
    'data-cy': dataCy = 'switch',
    ...other
  } = props as IWithAsProp<ISwitchOwnProps>;

  const [handlingChange, setHandlingChange] = useState(false);
  const loading =
    (loadingProp || handlingChange) && loadingAnimation === 'progressIndicator';
  const disabled = disabledProp || readOnly || loading;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef, actionRef]);

  const componentTheme = useComponentTheme('Switch');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(switchStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const [checked, setChecked] = useControlledValue({
    controlled: checkedProp,
    default: !!defaultChecked,
    name: 'Switch',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
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
      ).finally(() => setChecked(!event.target.checked));
    },
    [handlingChange, onChange, setChecked],
  );

  const hasCustomIcons = !!icon || !!selectedIcon;
  const hasIcons = icons || loading || hasCustomIcons;
  const showOnlySelectedIcon = !loading && showOnlySelectedIconProp;
  const shouldShowIcons = hasIcons || showOnlySelectedIcon;

  return (
    <div
      {...sxf(
        switchTheme,
        componentTheme.overridenStyles,
        'host',
        disabled && 'host$disabled',
        sx,
      )}
    >
      <div {...sxf('switch', checked && 'switch$selected')}>
        <Component
          {...sxf('input')}
          ref={handleRef}
          type='checkbox'
          role='switch'
          checked={checked}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onChange={disabled ? undefined : handleChange}
          data-cy={dataCy}
          {...other}
        />
        <FocusRing
          styles={[switchFocusRingStyles, ...asArray(innerStyles?.focusRing)]}
          for={actionRef}
          visualState={visualState}
        />

        <span {...sxf('track')}>
          <div
            {...sxf(
              'background',
              disabled && 'background$disabled',
              'trackBackground',
              checked && 'trackBackground$selected',
              disabled &&
                (checked
                  ? 'trackBackground$disabled$selected'
                  : 'trackBackground$disabled'),
            )}
          />
          <span
            {...sxf(
              'handleContainer',
              checked && 'handleContainer$selected',
              disabled && 'handleContainer$disabled',
            )}
          >
            <StateLayer
              styles={[
                switchStateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              for={actionRef}
              disabled={disabled}
              visualState={visualState}
            />
            <span
              {...sxf(
                'handle',
                checked && 'handle$selected',
                loading && 'handle$loading',
                disabled &&
                  (checked ? 'handle$disabled$selected' : 'handle$disabled'),
                (showOnlySelectedIcon ? checked : hasIcons) &&
                  'handle$withIcon',
              )}
            >
              <div
                {...sxf(
                  'background',
                  'handleBackground',
                  checked && 'handleBackground$selected',
                  disabled &&
                    (checked
                      ? 'handleBackground$disabled$selected'
                      : 'handleBackground$disabled'),
                )}
              />

              {shouldShowIcons ? (
                <div {...sxf('icons')}>
                  <div
                    {...sxf(
                      'icon',
                      !loading &&
                        (checked ? 'icon$size$selected' : 'icon$size'),
                      checked && 'icon$on$selected',
                      checked && disabled && 'icon$on$selected$disabled',
                    )}
                  >
                    {loading ? (
                      <IndeterminateCircularProgressIndicator
                        styles={[
                          switchCircularProgressIndicatorStyles,
                          ...asArray(innerStyles?.circularProgressIndicator),
                        ]}
                      />
                    ) : selectedIcon ? (
                      selectedIcon
                    ) : !hasCustomIcons ? (
                      <SvgIcon icon={iconCheckMark} />
                    ) : null}
                  </div>

                  {showOnlySelectedIcon ? null : (
                    <div
                      {...sxf(
                        'icon',
                        !loading &&
                          (checked ? 'icon$size$selected' : 'icon$size'),
                        !checked && 'icon$on',
                        !checked && disabled && 'icon$on$disabled',
                      )}
                    >
                      {loading ? (
                        <IndeterminateCircularProgressIndicator
                          styles={[
                            switchCircularProgressIndicatorStyles,
                            ...asArray(innerStyles?.circularProgressIndicator),
                          ]}
                        />
                      ) : icon ? (
                        icon
                      ) : !hasCustomIcons ? (
                        <SvgIcon icon={iconXMark} />
                      ) : null}
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
});
