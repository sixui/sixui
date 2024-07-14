import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { CHIP_DEFAULT_TAG, IChipOwnProps, IChipProps } from './Chip.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/components/utils/VisualState';
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { StateLayer } from '@/components/utils/StateLayer';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/IndeterminateCircularProgressIndicator';
import { ReactComponent as CheckMarkIcon } from '@/assets/CheckMark.svg';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { ButtonBase } from '@/components/atoms/ButtonBase';
import { Avatar } from '@/components/atoms/Avatar';
import { executeLazyPromise } from '@/helpers/executeLazyPromise';
import { chipVariantStyles } from './variants';
import {
  chipCircularProgressIndicatorStyles,
  chipElevationStyles,
  chipFocusRingStyles,
  chipSstateLayerStyles,
  chipStyles,
  chipTrailingActionFocusRingStyles,
  chipTrailingActionStateLayerStyles,
} from './Chip.styles';
import { chipTheme } from './Chip.stylex';

// https://github.com/material-components/material-web/blob/main/chips/internal/chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/assist-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/filter-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/input-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/suggestion-chip.ts

type IChip = <TRoot extends React.ElementType = typeof CHIP_DEFAULT_TAG>(
  props: IChipProps<TRoot>,
) => React.ReactNode;

export const Chip: IChip = forwardRef(function Chip<
  TRoot extends React.ElementType = typeof CHIP_DEFAULT_TAG,
>(props: IChipProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
    styles,
    sx,
    innerStyles,
    visualState: visualStateProp,
    selected: selectedProp,
    elevated: elevatedProp,
    loading: loadingProp,
    disabled: disabledProp,
    deleting: deletingProp,
    label,
    onClick,
    onDelete,
    variant = 'assist',
    icon,
    imageUrl,
    loadingText,
    href,
    avatar: avatarProp,
    'aria-label-remove': ariaLabelRemove,
    'data-cy': dataCy = 'chip',
    ...other
  } = props as IWithAsProp<IChipOwnProps>;

  const [handlingClick, setHandlingClick] = useState(false);
  const [handlingDelete, setHandlingDelete] = useState(false);

  const loading = loadingProp || handlingClick;
  const isDeletable = variant === 'input' && onDelete;
  const deleting = !loading && isDeletable && (deletingProp || handlingDelete);
  const disabled = disabledProp || loading || deleting;

  const primaryActionRef = useRef<HTMLElement>(null);
  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled },
  );
  const primaryHandleRef = useMergeRefs([
    forwardedRef,
    setVisualStateRef,
    primaryActionRef,
  ]);

  const trailingActionRef = useRef<HTMLButtonElement>(null);

  const { overridenStyles, settings } = useComponentTheme('Chip');
  const variantStyles = variant ? chipVariantStyles[variant] : undefined;

  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(chipStyles, variantStyles, styles),
    [variantStyles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const Component = as ?? (href ? settings.linkAs : onClick ? 'button' : 'div');

  const interactive = !!href || !!onClick;
  const elevated = variant !== 'input' && elevatedProp;
  const hasIcon = !!imageUrl || !!icon;
  const isSelectable =
    variant !== false && ['input', 'filter'].includes(variant);
  const selected = selectedProp;
  const hasLeading = (variant === 'filter' && (loading || selected)) || hasIcon;
  const hasTrailing = isDeletable;
  const hasOverlay = loading && (loadingText ?? !hasLeading);
  const avatar = variant === 'input' && !!imageUrl && avatarProp;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (handlingClick) {
        return;
      }

      void executeLazyPromise(() => onClick?.(event) as void, setHandlingClick);
    },
    [handlingClick, onClick],
  );

  const handleDelete: React.MouseEventHandler<HTMLButtonElement> | undefined =
    onDelete
      ? (event) => {
          if (handlingDelete) {
            return;
          }
          setHandlingDelete(true);
          Promise.resolve(onDelete(event))
            .finally(() => setHandlingDelete(false))
            .catch((error: Error) => {
              throw error;
            });
        }
      : undefined;

  // https://github.com/material-components/material-web/blob/035d1553662812e2dcc12aea8d70ea8bf26b164b/chips/internal/multi-action-chip.ts#L74
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const primaryActionEl = primaryActionRef?.current;
      const trailingActionEl = trailingActionRef?.current;
      if (!primaryActionEl || !trailingActionEl) {
        // Does not have multiple actions.
        return;
      }

      const isLeft = event.key === 'ArrowLeft';
      const isRight = event.key === 'ArrowRight';

      // Ignore non-navigation keys.
      if (!isLeft && !isRight) {
        return;
      }

      // Check if moving forwards or backwards.
      const forwards = isRight;
      const isPrimaryFocused = primaryActionEl?.matches(':focus-within');
      const isTrailingFocused = trailingActionEl?.matches(':focus-within');

      if ((forwards && isTrailingFocused) || (!forwards && isPrimaryFocused)) {
        // Moving outside of the chip, it will be handled by the chip set.
        return;
      }

      // Prevent default interactions, such as scrolling.
      event.preventDefault();
      // Don't let the chip set handle this navigation event.
      event.stopPropagation();
      const actionToFocus = forwards ? trailingActionEl : primaryActionEl;
      actionToFocus.focus();
    },
    [],
  );

  // https://github.com/material-components/material-web/blob/035d1553662812e2dcc12aea8d70ea8bf26b164b/chips/internal/multi-action-chip.ts#L106
  const handleTrailingActionFocus = useCallback(() => {
    const primaryActionEl = primaryActionRef?.current;
    const trailingActionEl = trailingActionRef?.current;
    if (!primaryActionEl || !trailingActionEl) {
      return;
    }

    // Temporarily turn off the primary action's focusability. This allows
    // shift+tab from the trailing action to move to the previous chip rather
    // than the primary action in the same chip.
    primaryActionEl.tabIndex = -1;
    trailingActionEl.addEventListener(
      'focusout',
      () => {
        primaryActionEl.tabIndex = 0;
      },
      { once: true },
    );
  }, []);

  const containerStyle = isSelectable
    ? selected
      ? elevated
        ? 'selectedElevatedContainer'
        : 'selectedFlatContainer'
      : elevated
        ? 'elevatedContainer'
        : 'flatContainer'
    : elevated
      ? 'elevatedContainer'
      : 'flatContainer';

  return (
    <div
      {...sxf(
        chipTheme,
        overridenStyles,
        'host',
        interactive && 'host$interactive',
        disabled && 'host$disabled',
        avatar && 'host$avatar',
        sx,
      )}
      data-cy={dataCy}
    >
      <div
        {...sxf(
          'container',
          containerStyle,
          interactive && `${containerStyle}$interactive`,
          disabled && `${containerStyle}$disabled`,
          loading && `${containerStyle}$loading`,
        )}
      >
        <Elevation
          styles={[chipElevationStyles, ...asArray(innerStyles?.elevation)]}
          disabled={disabledProp}
        />
        {elevated ? null : (
          <span
            {...sxf(
              'outline',
              interactive && 'outline$interactive',
              selected && 'outline$selected',
              disabled && 'outline$disabled',
            )}
          />
        )}
        <FocusRing
          styles={[chipFocusRingStyles, ...asArray(innerStyles?.focusRing)]}
          for={primaryActionRef}
          visualState={visualState}
        />
        {interactive ? (
          <StateLayer
            styles={[
              chipSstateLayerStyles,
              ...asArray(innerStyles?.stateLayer),
            ]}
            for={primaryActionRef}
            disabled={disabled}
            visualState={visualState}
          />
        ) : null}

        <Component
          {...sxf(
            'action',
            'action$primary',
            hasLeading && 'action$primary$hasLeading',
            hasTrailing && 'action$primary$hasTrailing',
            avatar && 'action$primary$avatar',
          )}
          ref={primaryHandleRef}
          href={href}
          onClick={href ?? !onClick ? undefined : handleClick}
          role='button'
          disabled={disabled}
          tabIndex={!interactive || disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          {...other}
        >
          {hasLeading ? (
            <div
              {...sxf(
                'iconContainer',
                'iconContainer$leading',
                disabled
                  ? 'iconContainer$disabled'
                  : selected && [
                      'iconContainer$selected',
                      interactive && 'iconContainer$selected$interactive',
                    ],
                avatar && 'iconContainer$avatar',
              )}
            >
              {loading ? (
                !loadingText ? (
                  <IndeterminateCircularProgressIndicator
                    sx={stylesCombinator('icon')}
                    styles={[
                      chipCircularProgressIndicatorStyles,
                      ...asArray(innerStyles?.circularProgressIndicator),
                    ]}
                  />
                ) : null
              ) : selected && variant === 'filter' ? (
                <CheckMarkIcon {...sxf('icon')} aria-hidden />
              ) : imageUrl ? (
                <Avatar
                  sx={stylesCombinator('icon', 'icon$avatar')}
                  src={imageUrl}
                />
              ) : icon ? (
                icon
              ) : null}
            </div>
          ) : (
            <div
              {...sxf(
                'iconContainer',
                'iconContainer$leading',
                'iconContainer$collapsed',
              )}
            />
          )}

          <div
            {...sxf(
              'labelContainer',
              hasTrailing && 'labelContainer$hasTrailing',
            )}
          >
            <span
              {...sxf(
                'label',
                interactive && 'label$interactive',
                selected && [
                  'label$selected',
                  interactive && 'label$selected$interactive',
                ],
                disabled && 'label$disabled',
                hasOverlay ? 'invisible' : null,
              )}
            >
              {label}
            </span>

            {hasOverlay ? (
              <div {...sxf('overlay')}>
                {loadingText ? (
                  <span {...sxf('label', disabled && 'label$disabled')}>
                    {loadingText}
                  </span>
                ) : (
                  <div {...sxf(disabled && 'iconContainer$disabled')}>
                    <IndeterminateCircularProgressIndicator
                      styles={[
                        chipCircularProgressIndicatorStyles,
                        ...asArray(innerStyles?.circularProgressIndicator),
                      ]}
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <span {...sxf('touchTarget')}></span>
        </Component>

        {isDeletable ? (
          <ButtonBase
            ref={trailingActionRef}
            sx={[...stylesCombinator('action', 'action$trailing')]}
            innerStyles={{
              focusRing: [
                chipTrailingActionFocusRingStyles,
                ...asArray(innerStyles?.trailingActionFocusRing),
              ],
              stateLayer: [
                chipTrailingActionStateLayerStyles,
                ...asArray(innerStyles?.trailingActionStateLayer),
              ],
            }}
            aria-label={ariaLabelRemove}
            tabIndex={-1}
            onClick={handleDelete}
            onKeyDown={handleKeyDown}
            onFocus={handleTrailingActionFocus}
            disabled={disabled}
            data-cy='delete'
          >
            <span
              {...sxf(
                'iconContainer',
                'iconContainer$trailing',
                interactive && 'iconContainer$trailing$interactive',
                disabled
                  ? 'iconContainer$disabled'
                  : selected && [
                      'iconContainer$trailing$selected',
                      interactive &&
                        'iconContainer$trailing$selected$interactive',
                    ],
              )}
              aria-hidden
            >
              {deleting ? (
                <div {...sxf('overlay')}>
                  <IndeterminateCircularProgressIndicator
                    styles={[
                      chipCircularProgressIndicatorStyles,
                      ...asArray(innerStyles?.circularProgressIndicator),
                    ]}
                  />
                </div>
              ) : (
                <XMarkIcon aria-hidden />
              )}
            </span>
          </ButtonBase>
        ) : null}
      </div>
    </div>
  );
});
