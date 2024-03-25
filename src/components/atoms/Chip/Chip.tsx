import { forwardRef, useCallback, useMemo, useRef, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

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
} from '@/helpers/polymorphicComponentTypes';
import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  IChipStyleKey,
  IChipStyleVarKey,
  IChipVariant,
} from './Chip.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import {
  Elevation,
  type IElevationStyleKey,
} from '@/components/utils/Elevation';
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
import { useForkRef } from '@/hooks/useForkRef';
import { ButtonBase } from '@/components/atoms/ButtonBase';
import { Avatar } from '../Avatar';

// https://github.com/material-components/material-web/blob/main/chips/internal/chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/assist-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/filter-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/input-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/suggestion-chip.ts

const DEFAULT_TAG = 'div';

export type IChipOwnProps = IContainerProps<IChipStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    trailingActionFocusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    trailingActionStateLayer?: IZeroOrMore<
      ICompiledStyles<IStateLayerStyleKey>
    >;
    circularProgressIndicator?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
  };
  visualState?: IVisualState;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  onDelete?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  variant?: IChipVariant | false;
  label?: React.ReactNode;
  disabled?: boolean;
  elevated?: boolean;
  selected?: boolean;
  icon?: React.ReactNode;
  href?: string;
  imageUrl?: string;
  loading?: boolean;
  loadingText?: string;
  deleting?: boolean;
  avatar?: boolean;
  'aria-label-remove'?: React.AriaAttributes['aria-label'];
};

export type IChipProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, IChipOwnProps>;

type IChipVariantMap = {
  [key in IChipVariant]: keyof Pick<
    IThemeComponents,
    'AssistChip' | 'FilterChip' | 'InputChip' | 'SuggestionChip'
  >;
};

const variantMap: IChipVariantMap = {
  assist: 'AssistChip',
  filter: 'FilterChip',
  input: 'InputChip',
  suggestion: 'SuggestionChip',
};

const avatarStyles = stylex.create({
  host: {
    width: '100%',
    height: '100%',
  },
});

type IChip = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IChipProps<TRoot>,
) => React.ReactNode;

export const Chip: IChip = forwardRef(function Chip<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IChipProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
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
    'data-cy': dataCy,
    ...other
  } = props as IWithAsProp<IChipOwnProps>;

  const [handlingClick, setHandlingClick] = useState(false);
  const [handlingDelete, setHandlingDelete] = useState(false);

  const loading = loadingProp || handlingClick;
  const isDeletable = variant === 'input' && onDelete;
  const deleting = !loading && isDeletable && (deletingProp || handlingDelete);
  const disabled = disabledProp || loading || deleting;

  const primaryActionRef = useRef<HTMLElement>(null);
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const primaryHandleRef = useForkRef(ref, visualStateRef, primaryActionRef);

  const trailingActionRef = useRef<HTMLButtonElement>(null);

  const { theme, variantTheme } = useComponentTheme(
    'Chip',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IChipStyleKey, IChipStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const Component = as ?? (href ? 'a' : onClick ? 'button' : 'div');

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

      setHandlingClick(true);

      Promise.resolve(onClick?.(event))
        .finally(() => setHandlingClick(false))
        .catch((error: Error) => {
          throw error;
        });
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
        'host',
        interactive && 'host$interactive',
        disabled && 'host$disabled',
        avatar && 'host$avatar',
        theme.vars,
        variantTheme?.vars,
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
        )}
      >
        <Elevation
          styles={[
            theme.elevationStyles,
            variantTheme?.elevationStyles,
            ...asArray(innerStyles?.elevation),
          ]}
          disabled={disabled}
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
        {interactive ? (
          <>
            <FocusRing
              styles={[
                theme.focusRingStyles,
                variantTheme?.focusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              for={primaryActionRef}
              visualState={visualState}
            />
            <StateLayer
              styles={[
                theme.stateLayerStyles,
                variantTheme?.stateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              for={primaryActionRef}
              disabled={disabled}
              visualState={visualState}
            />
          </>
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
                'icon',
                'icon$leading',
                disabled
                  ? 'icon$disabled'
                  : selected && [
                      'icon$selected',
                      interactive && 'icon$selected$interactive',
                    ],
                avatar && 'icon$avatar',
              )}
            >
              {loading ? (
                !loadingText ? (
                  <IndeterminateCircularProgressIndicator
                    styles={[
                      theme.circularProgressIndicatorStyles,
                      variantTheme?.circularProgressIndicatorStyles,
                      ...asArray(innerStyles?.circularProgressIndicator),
                    ]}
                  />
                ) : null
              ) : selected && variant === 'filter' ? (
                <CheckMarkIcon aria-hidden />
              ) : imageUrl ? (
                <Avatar src={imageUrl} styles={avatarStyles} />
              ) : icon ? (
                icon
              ) : null}
            </div>
          ) : null}

          <div style={hasTrailing ? { position: 'relative' } : undefined}>
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
                  <div {...sxf(disabled && 'icon$disabled')}>
                    <IndeterminateCircularProgressIndicator
                      styles={[
                        theme.circularProgressIndicatorStyles,
                        variantTheme?.circularProgressIndicatorStyles,
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
                theme.trailingActionFocusRingStyles,
                variantTheme?.trailingActionFocusRingStyles,
                ...asArray(innerStyles?.trailingActionFocusRing),
              ],
              stateLayer: [
                theme.trailingActionStateLayerStyles,
                variantTheme?.trailingActionStateLayerStyles,
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
                'icon',
                'icon$trailing',
                interactive && 'icon$trailing$interactive',
                disabled
                  ? 'icon$disabled'
                  : selected && [
                      'icon$trailing$selected',
                      interactive && 'icon$trailing$selected$interactive',
                    ],
              )}
              aria-hidden
            >
              {deleting ? (
                <div {...sxf('overlay')}>
                  <IndeterminateCircularProgressIndicator
                    styles={[
                      theme.circularProgressIndicatorStyles,
                      variantTheme?.circularProgressIndicatorStyles,
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
