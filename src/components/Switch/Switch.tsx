import { forwardRef, useCallback, useContext, useRef, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { ISwitchProps } from './Switch.types';
import { useControlledValue } from '~/hooks/useControlledValue';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { iconCheckMark, iconXMark } from '~/assets/icons';
import { useVisualState } from '../VisualState';
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { SvgIcon } from '../SvgIcon';
import { LabeledContext } from '../Labeled';
import { switchTheme } from './Switch.stylex';
import {
  switchCircularProgressIndicatorStyles,
  switchFocusRingStyles,
  switchStateLayerStyles,
  switchStyles,
} from './Switch.styles';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '../Base';

// https://github.com/material-components/material-web/blob/main/switch/internal/switch.ts

export const Switch = forwardRef<HTMLInputElement, ISwitchProps>(
  function Switch(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      visualState: visualStateProp,
      checked: checkedProp,
      defaultChecked,
      loading: loadingProp,
      icons,
      showOnlySelectedIcon: showOnlySelectedIconProp,
      loadingAnimation = 'progressIndicator',
      onChange,
      icon,
      selectedIcon,
      readOnly: readOnlyProp,
      ...other
    } = props;

    const labeledContext = useContext(LabeledContext);
    const [handlingChange, setHandlingChange] = useState(false);
    const loading =
      (loadingProp || handlingChange || labeledContext?.loading) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading || labeledContext?.readOnly;
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
      name: 'Switch',
      styles: [switchStyles, styles],
      visualState,
    });

    const [checked, setChecked] = useControlledValue({
      controlled: checkedProp,
      default: !!defaultChecked,
      name: 'Switch',
    });

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
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
      <Base
        sx={[
          switchTheme,
          globalStyles,
          combineStyles('host', visuallyDisabled && 'host$disabled'),
          sx,
        ]}
      >
        <div {...getStyles('switch', checked && 'switch$selected')}>
          <input
            type='checkbox'
            role='switch'
            checked={checked}
            onChange={visuallyDisabled ? undefined : handleChange}
            data-cy='switch'
            id={labeledContext?.id}
            required={labeledContext?.required}
            {...other}
            {...getStyles('input')}
            ref={handleRef}
          />
          <FocusRing
            styles={[switchFocusRingStyles, ...asArray(innerStyles?.focusRing)]}
            for={actionRef}
            visualState={visualState}
          />

          <span {...getStyles('track')}>
            <div
              {...getStyles(
                'background',
                visuallyDisabled && 'background$disabled',
                'trackBackground',
                checked && 'trackBackground$selected',
                visuallyDisabled &&
                  (checked
                    ? 'trackBackground$disabled$selected'
                    : 'trackBackground$disabled'),
              )}
            />
            <span
              {...getStyles(
                'handleContainer',
                checked && 'handleContainer$selected',
                visuallyDisabled && 'handleContainer$disabled',
              )}
            >
              <StateLayer
                styles={[
                  switchStateLayerStyles,
                  ...asArray(innerStyles?.stateLayer),
                ]}
                for={actionRef}
                disabled={visuallyDisabled}
                visualState={visualState}
              />
              <span
                {...getStyles(
                  'handle',
                  checked && 'handle$selected',
                  loading && 'handle$loading',
                  visuallyDisabled &&
                    (checked ? 'handle$disabled$selected' : 'handle$disabled'),
                  (showOnlySelectedIcon ? checked : hasIcons) &&
                    'handle$withIcon',
                )}
              >
                <div
                  {...getStyles(
                    'background',
                    'handleBackground',
                    checked && 'handleBackground$selected',
                    visuallyDisabled &&
                      (checked
                        ? 'handleBackground$disabled$selected'
                        : 'handleBackground$disabled'),
                  )}
                />

                {shouldShowIcons ? (
                  <div {...getStyles('icons')}>
                    <div
                      {...getStyles(
                        'icon',
                        !loading &&
                          (checked ? 'icon$size$selected' : 'icon$size'),
                        checked && 'icon$on$selected',
                        checked &&
                          visuallyDisabled &&
                          'icon$on$selected$disabled',
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
                        {...getStyles(
                          'icon',
                          !loading &&
                            (checked ? 'icon$size$selected' : 'icon$size'),
                          !checked && 'icon$on',
                          !checked && visuallyDisabled && 'icon$on$disabled',
                        )}
                      >
                        {loading ? (
                          <IndeterminateCircularProgressIndicator
                            styles={[
                              switchCircularProgressIndicatorStyles,
                              ...asArray(
                                innerStyles?.circularProgressIndicator,
                              ),
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
      </Base>
    );
  },
);
