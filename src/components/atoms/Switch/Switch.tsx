import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

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
import type { ISwitchStyleKey, ISwitchStyleVarKey } from './Switch.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  type IVisualState,
  useVisualState,
} from '@/components/utils/VisualState';
import { useControlledValue } from '@/hooks/useControlledValue';
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
import { ReactComponent as CheckMarkIcon } from '@/assets/CheckMark.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { executeLazyPromise } from '@/helpers/executeLazyPromise';

// https://github.com/material-components/material-web/blob/main/switch/internal/switch.ts

const DEFAULT_TAG = 'input';

export type ISwitchOwnProps = IContainerProps<ISwitchStyleKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    innerStyles?: {
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
      circularProgressIndicator?: IZeroOrMore<
        ICompiledStyles<ICircularProgressIndicatorStyleKey>
      >;
    };
    visualState?: IVisualState;

    id?: string;
    name?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;

    checked?: boolean;
    defaultChecked?: boolean;

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
    onClick?: React.MouseEventHandler<HTMLInputElement>;
  };

export type ISwitchProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, ISwitchOwnProps>;

type ISwitch = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: ISwitchProps<TRoot>,
) => React.ReactNode;

export const Switch: ISwitch = forwardRef(function Switch<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: ISwitchProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as: Component = DEFAULT_TAG,
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
    {
      disabled,
    },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef, actionRef]);

  const { theme } = useComponentTheme('Switch');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ISwitchStyleKey, ISwitchStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const [selected, setSelected] = useControlledValue({
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
        () => onChange?.(event, !selected) as void,
        setHandlingChange,
      ).finally(() => setSelected(!selected));
    },
    [handlingChange, onChange, selected, setSelected],
  );

  const hasCustomIcons = !!icon || !!selectedIcon;
  const hasIcons = icons || loading || hasCustomIcons;
  const showOnlySelectedIcon = !loading && showOnlySelectedIconProp;
  const shouldShowIcons = hasIcons || showOnlySelectedIcon;

  return (
    <div {...sxf('host', disabled && 'host$disabled', theme.vars, sx)}>
      <div {...sxf('switch', selected && 'switch$selected')}>
        <Component
          {...sxf('input')}
          ref={handleRef}
          type='checkbox'
          role='switch'
          checked={selected}
          disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          onChange={disabled ? undefined : handleChange}
          data-cy={dataCy}
          {...other}
        />
        <FocusRing
          styles={[theme.focusRingStyles, ...asArray(innerStyles?.focusRing)]}
          for={actionRef}
          visualState={visualState}
        />

        <span {...sxf('track')}>
          <div
            {...sxf(
              'background',
              disabled && 'background$disabled',
              'trackBackground',
              selected && 'trackBackground$selected',
              disabled &&
                (selected
                  ? 'trackBackground$disabled$selected'
                  : 'trackBackground$disabled'),
            )}
          />
          <span
            {...sxf(
              'handleContainer',
              selected && 'handleContainer$selected',
              disabled && 'handleContainer$disabled',
            )}
          >
            <StateLayer
              styles={[
                theme.stateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              for={actionRef}
              disabled={disabled}
              visualState={visualState}
            />
            <span
              {...sxf(
                'handle',
                selected && 'handle$selected',
                loading && 'handle$loading',
                disabled &&
                  (selected ? 'handle$disabled$selected' : 'handle$disabled'),
                (showOnlySelectedIcon ? selected : hasIcons) &&
                  'handle$withIcon',
              )}
            >
              <div
                {...sxf(
                  'background',
                  'handleBackground',
                  selected && 'handleBackground$selected',
                  disabled &&
                    (selected
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
                        (selected ? 'icon$size$selected' : 'icon$size'),
                      selected && 'icon$on$selected',
                      selected && disabled && 'icon$on$selected$disabled',
                    )}
                  >
                    {loading ? (
                      <IndeterminateCircularProgressIndicator
                        styles={[
                          theme.circularProgressIndicatorStyles,
                          ...asArray(innerStyles?.circularProgressIndicator),
                        ]}
                      />
                    ) : selectedIcon ? (
                      selectedIcon
                    ) : !hasCustomIcons ? (
                      <CheckMarkIcon aria-hidden />
                    ) : null}
                  </div>

                  {showOnlySelectedIcon ? null : (
                    <div
                      {...sxf(
                        'icon',
                        !loading &&
                          (selected ? 'icon$size$selected' : 'icon$size'),
                        !selected && 'icon$on',
                        !selected && disabled && 'icon$on$disabled',
                      )}
                    >
                      {loading ? (
                        <IndeterminateCircularProgressIndicator
                          styles={[
                            theme.circularProgressIndicatorStyles,
                            ...asArray(innerStyles?.circularProgressIndicator),
                          ]}
                        />
                      ) : icon ? (
                        icon
                      ) : !hasCustomIcons ? (
                        <XMarkIcon aria-hidden />
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
