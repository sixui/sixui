import { forwardRef, useCallback, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type { IChipProps } from './Chip.types';
import { iconCheckMark, iconXMark } from '~/assets/icons';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useStyles } from '~/hooks/useStyles';
import {
  createPolymorphicComponent,
  IWithAsProp,
} from '~/utils/component/createPolymorphicComponent';
import { Avatar } from '../Avatar';
import { Base } from '../Base';
import { ButtonBase } from '../ButtonBase';
import { Elevation } from '../Elevation';
import { FocusRing } from '../FocusRing';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { StateLayer } from '../StateLayer';
import { SvgIcon } from '../SvgIcon';
import { TouchTarget } from '../TouchTarget';
import { useVisualState } from '../VisualState';
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
import { chipVariantStyles } from './variants';

// https://github.com/material-components/material-web/blob/main/chips/internal/chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/assist-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/filter-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/input-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/suggestion-chip.ts

export const Chip = createPolymorphicComponent<'div', IChipProps>(
  forwardRef<HTMLDivElement, IChipProps>(function Chip(props, forwardedRef) {
    const {
      as,
      styles,
      sx,
      innerStyles,
      visualState: visualStateProp,
      selected: selectedProp,
      elevated: elevatedProp,
      loading: loadingProp,
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
      readOnly: readOnlyProp,
      ...other
    } = props as IWithAsProp<IChipProps>;

    const [handlingClick, setHandlingClick] = useState(false);
    const [handlingDelete, setHandlingDelete] = useState(false);

    const loading = loadingProp || handlingClick;
    const isDeletable = variant === 'input' && onDelete;
    const deleting =
      !loading && isDeletable && (deletingProp || handlingDelete);
    const readOnly = readOnlyProp || loading || deleting;
    const visuallyDisabled = other.disabled || readOnly;

    const primaryActionRef = useRef<HTMLElement>(null);
    const { visualState, setRef: setVisualStateRef } = useVisualState(
      visualStateProp,
      { disabled: visuallyDisabled },
    );
    const primaryHandleRef = useMergeRefs([
      forwardedRef,
      setVisualStateRef,
      primaryActionRef,
    ]);

    const trailingActionRef = useRef<HTMLButtonElement>(null);

    const variantStyles = variant ? chipVariantStyles[variant] : undefined;
    const { combineStyles, getStyles, globalStyles, settings } = useStyles({
      componentName: 'Avatar',
      styles: [chipStyles, variantStyles, styles],
      visualState,
    });

    const rootElement =
      as ?? (href ? (settings?.linkAs ?? 'a') : onClick ? 'button' : 'div');

    const interactive = !!href || !!onClick;
    const elevated = variant !== 'input' && elevatedProp;
    const hasIcon = !!imageUrl || !!icon;
    const isSelectable =
      variant !== false && ['input', 'filter'].includes(variant);
    const selected = selectedProp;
    const hasLeading =
      (variant === 'filter' && (loading || selected)) || hasIcon;
    const hasTrailing = isDeletable;
    const hasOverlay = loading && (loadingText ?? !hasLeading);
    const avatar =
      variant !== false &&
      ['assist', 'input'].includes(variant) &&
      !!imageUrl &&
      avatarProp;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        if (handlingClick) {
          return;
        }

        void executeLazyPromise(
          () => onClick?.(event) as void,
          setHandlingClick,
        );
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

        if (
          (forwards && isTrailingFocused) ||
          (!forwards && isPrimaryFocused)
        ) {
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
      <Base
        visualState={visualState}
        sx={[
          chipTheme,
          globalStyles,
          combineStyles(
            'host',
            interactive && 'host$interactive',
            visuallyDisabled && 'host$disabled',
            avatar && 'host$avatar',
          ),
          sx,
        ]}
      >
        <div
          {...getStyles(
            'container',
            containerStyle,
            interactive && `${containerStyle}$interactive`,
            visuallyDisabled && `${containerStyle}$disabled`,
            loading && `${containerStyle}$loading`,
          )}
        >
          <Elevation
            styles={[chipElevationStyles, ...asArray(innerStyles?.elevation)]}
            disabled={visuallyDisabled}
          />
          {elevated ? null : (
            <span
              {...getStyles(
                'outline',
                interactive && 'outline$interactive',
                selected && 'outline$selected',
                visuallyDisabled && 'outline$disabled',
              )}
            />
          )}
          {visuallyDisabled ? null : (
            <FocusRing
              styles={[chipFocusRingStyles, ...asArray(innerStyles?.focusRing)]}
              for={primaryActionRef}
              visualState={visualState}
            />
          )}
          {interactive ? (
            <StateLayer
              styles={[
                chipSstateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              for={primaryActionRef}
              disabled={visuallyDisabled}
              interactionState={visualState}
            />
          ) : null}

          <Base
            as={rootElement}
            href={href}
            onClick={(href ?? !onClick) ? undefined : handleClick}
            role="button"
            tabIndex={!interactive || other.disabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            {...other}
            visualState={visualState}
            sx={combineStyles(
              'action',
              'action$primary',
              hasLeading && 'action$primary$hasLeading',
              hasTrailing && 'action$primary$hasTrailing',
              avatar && 'action$primary$avatar',
            )}
            ref={primaryHandleRef}
          >
            <TouchTarget
              visualState={visualState}
              disabled={visuallyDisabled}
            />
            {hasLeading ? (
              <div
                {...getStyles(
                  'iconContainer',
                  'iconContainer$leading',
                  visuallyDisabled
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
                      sx={combineStyles('icon')}
                      styles={[
                        chipCircularProgressIndicatorStyles,
                        ...asArray(innerStyles?.circularProgressIndicator),
                      ]}
                    />
                  ) : null
                ) : selected && variant === 'filter' ? (
                  <SvgIcon sx={combineStyles('icon')} icon={iconCheckMark} />
                ) : imageUrl ? (
                  <Avatar
                    sx={combineStyles('icon', 'icon$avatar')}
                    src={imageUrl}
                  />
                ) : icon ? (
                  icon
                ) : null}
              </div>
            ) : (
              <div
                {...getStyles(
                  'iconContainer',
                  'iconContainer$leading',
                  'iconContainer$collapsed',
                )}
              />
            )}

            <div
              {...getStyles(
                'labelContainer',
                hasTrailing && 'labelContainer$hasTrailing',
              )}
            >
              <span
                {...getStyles(
                  'label',
                  interactive && 'label$interactive',
                  selected && [
                    'label$selected',
                    interactive && 'label$selected$interactive',
                  ],
                  visuallyDisabled && 'label$disabled',
                  hasOverlay ? 'invisible' : null,
                )}
              >
                {label}
              </span>

              {hasOverlay ? (
                <div {...getStyles('overlay')}>
                  {loadingText ? (
                    <span
                      {...getStyles(
                        'label',
                        visuallyDisabled && 'label$disabled',
                      )}
                    >
                      {loadingText}
                    </span>
                  ) : (
                    <div
                      {...getStyles(
                        visuallyDisabled && 'iconContainer$disabled',
                      )}
                    >
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
          </Base>

          {isDeletable ? (
            <ButtonBase
              ref={trailingActionRef}
              sx={combineStyles('action', 'action$trailing')}
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
              disabled={other.disabled}
              readOnly={readOnly}
              data-cy="delete"
            >
              <span
                {...getStyles(
                  'iconContainer',
                  'iconContainer$trailing',
                  interactive && 'iconContainer$trailing$interactive',
                  visuallyDisabled
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
                  <div {...getStyles('overlay')}>
                    <IndeterminateCircularProgressIndicator
                      styles={[
                        chipCircularProgressIndicatorStyles,
                        ...asArray(innerStyles?.circularProgressIndicator),
                      ]}
                    />
                  </div>
                ) : (
                  <SvgIcon icon={iconXMark} />
                )}
              </span>
            </ButtonBase>
          ) : null}
        </div>
      </Base>
    );
  }),
);
