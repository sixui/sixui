import {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { LabeledContext } from '~/components/Labeled';
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
    component: Component = SWITCH_DEFAULT_TAG,
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
    'data-cy': dataCy = 'switch',
    softDisabled: softDisabledProp,
    ...other
  } = props as IWithAsProp<ISwitchOwnProps>;

  const labeledContext = useContext(LabeledContext);
  const [handlingChange, setHandlingChange] = useState(false);
  const loading =
    (loadingProp || handlingChange || labeledContext?.loading) &&
    loadingAnimation === 'progressIndicator';
  const softDisabled = softDisabledProp || loading || labeledContext?.disabled;
  const visuallyDisabled =
    other.disabled || labeledContext?.disabled || softDisabled;

  const actionRef = useRef<HTMLInputElement>(null);
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled: visuallyDisabled },
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
        visuallyDisabled && 'host$disabled',
        sx,
      )}
    >
      <div {...sxf('switch', checked && 'switch$selected')}>
        <Component
          type='checkbox'
          role='switch'
          checked={checked}
          onChange={visuallyDisabled ? undefined : handleChange}
          data-cy={dataCy}
          id={labeledContext?.id}
          required={labeledContext?.required}
          {...other}
          {...sxf('input')}
          ref={handleRef}
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
            {...sxf(
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
              {...sxf(
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
                {...sxf(
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
                <div {...sxf('icons')}>
                  <div
                    {...sxf(
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
                      {...sxf(
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
