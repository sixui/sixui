import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IMaybeAsync, IIcon } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  IChipStyleKey,
  IChipStyleVarKey,
  IChipVariant,
} from './Chip.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { useControlled } from '@/hooks/useControlled';
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';
import { ReactComponent as CheckMark } from '@/assets/CheckMark.svg';
import { ReactComponent as XMark } from '@/assets/XMark.svg';

export interface IChipProps
  extends IContainer<IChipStyleKey, IChipStyleVarKey>,
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'disabled' | 'aria-label'
    >,
    Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> {
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  onDelete?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  variant?: IChipVariant;
  label?: string;
  elevated?: boolean;
  selected?: boolean;
  defaultSelected?: boolean;
  icon?: IIcon;
  imageUrl?: string;
  loading?: boolean;
  loadingText?: string;
  deleting?: boolean;
  component?: React.ElementType;
  'aria-label-remove'?: React.AriaAttributes['aria-label'];
  avatar?: boolean;
}

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

// https://github.com/material-components/material-web/blob/main/chips/internal/chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/assist-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/filter-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/input-chip.ts
// https://github.com/material-components/material-web/blob/main/chips/internal/suggestion-chip.ts
export const Chip: React.FC<IChipProps> = ({
  label,
  onClick,
  onDelete,
  variant = 'assist',
  icon: Icon,
  imageUrl,
  loadingText,
  href,
  ...props
}) => {
  const {
    theme,
    styles,
    rippleStyles,
    elevationStyles,
    focusRingStyles,
    trailingActionFocusRingStyles,
    trailingActionRippleStyles,
    circularProgressIndicatorStyles,
  } = useComponentTheme('Chip');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const primaryActionElRef = React.useRef<HTMLButtonElement | HTMLLinkElement>(
    null,
  );
  const trailingActionElRef = React.useRef<HTMLButtonElement>(null);
  const [handlingClick, setHandlingClick] = React.useState(false);
  const [handlingDelete, setHandlingDelete] = React.useState(false);
  const visualState = accumulate(
    useVisualState(primaryActionElRef),
    props.visualState,
  );
  const trailingActionVisualState = accumulate(
    useVisualState(trailingActionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IChipStyleKey, IChipStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
  );

  const [selectedValue, setSelectedValue] = useControlled({
    controlled: props.selected,
    default: !!props.defaultSelected,
    name: 'Chip',
  });

  const Component: React.ElementType = href ? 'a' : props.component ?? 'button';

  const elevated = variant !== 'input' && props.elevated;
  const loading = props.loading || handlingClick;
  const hasIcon = !!imageUrl || !!Icon;
  const isDeletable = variant === 'input' && onDelete;
  const deleting =
    !loading && isDeletable && (props.deleting || handlingDelete);
  const isSelectable = ['input', 'filter'].includes(variant);
  const selected = isSelectable && selectedValue;
  const disabled = props.disabled || loading || deleting;
  const hasLeading = (variant === 'filter' && (loading || selected)) || hasIcon;
  const hasTrailing = isDeletable;
  const hasOverlay = loading && (loadingText || !hasLeading);
  const avatar = variant === 'input' && !!imageUrl && props.avatar;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (event) => {
        if (handlingClick) {
          return;
        }

        setHandlingClick(true);

        Promise.resolve(onClick?.(event))
          .finally(() => {
            setHandlingClick(false);
            setSelectedValue(!selectedValue);
          })
          .catch((error: Error) => {
            throw error;
          });
      },
      [handlingClick, onClick, selectedValue, setSelectedValue],
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
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const primaryActionEl = primaryActionElRef.current;
      const trailingActionEl = trailingActionElRef.current;
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
    [primaryActionElRef, trailingActionElRef],
  );

  // https://github.com/material-components/material-web/blob/035d1553662812e2dcc12aea8d70ea8bf26b164b/chips/internal/multi-action-chip.ts#L106
  const handleTrailingActionFocus = React.useCallback(() => {
    const primaryActionEl = primaryActionElRef.current;
    const trailingActionEl = trailingActionElRef.current;
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
  }, [primaryActionElRef, trailingActionElRef]);

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
      {...styleProps(
        ['host', disabled && 'host$disabled', avatar && 'host$avatar'],
        [theme, variantTheme, props.theme],
      )}
    >
      <div
        {...styleProps([
          'container',
          containerStyle,
          disabled && `${containerStyle}$disabled`,
        ])}
      >
        <Elevation styles={elevationStyles} disabled={disabled} />
        {elevated ? null : (
          <span
            {...styleProps([
              'outline',
              selected && 'outline$selected',
              disabled && 'outline$disabled',
            ])}
          />
        )}
        <FocusRing
          styles={focusRingStyles}
          for={primaryActionElRef}
          visualState={visualState}
        />
        <Ripple
          for={primaryActionElRef}
          styles={rippleStyles}
          disabled={disabled}
          visualState={visualState}
        />

        <Component
          {...styleProps([
            'action',
            'action$primary',
            hasLeading && 'action$primary$hasLeading',
            hasTrailing && 'action$primary$hasTrailing',
            avatar && 'action$primary$avatar',
          ])}
          href={href}
          ref={primaryActionElRef}
          onClick={href ? undefined : handleClick}
          role='button'
          readOnly={disabled}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
          aria-label={props['aria-label']}
        >
          {hasLeading ? (
            <div
              {...styleProps([
                'icon',
                'icon$leading',
                disabled ? 'icon$disabled' : selected && 'icon$selected',
                avatar && 'icon$avatar',
              ])}
            >
              {loading ? (
                !loadingText ? (
                  <IndeterminateCircularProgressIndicator
                    styles={circularProgressIndicatorStyles}
                  />
                ) : null
              ) : selected && variant === 'filter' ? (
                <CheckMark aria-hidden='true' />
              ) : imageUrl ? (
                <img
                  {...styleProps(['image', avatar && 'image$avatar'])}
                  src={imageUrl}
                  alt=''
                />
              ) : Icon ? (
                <Icon aria-hidden='true' />
              ) : null}
            </div>
          ) : null}

          <div style={hasTrailing ? { position: 'relative' } : undefined}>
            <span
              {...styleProps([
                'label',
                selected && 'label$selected',
                disabled && 'label$disabled',
                hasOverlay ? 'invisible' : null,
              ])}
            >
              {label}
            </span>

            {hasOverlay ? (
              <div {...styleProps(['overlay'])}>
                {loadingText ? (
                  <span
                    {...styleProps(['label', disabled && 'label$disabled'])}
                  >
                    {loadingText}
                  </span>
                ) : (
                  <div {...styleProps([disabled && 'icon$disabled'])}>
                    <IndeterminateCircularProgressIndicator
                      styles={circularProgressIndicatorStyles}
                    />
                  </div>
                )}
              </div>
            ) : null}
          </div>

          <span {...styleProps(['touchTarget'])}></span>
        </Component>

        {isDeletable ? (
          <button
            {...styleProps(['action', 'action$trailing'])}
            aria-label={props['aria-label-remove']}
            tabIndex={-1}
            onClick={handleDelete}
            onKeyDown={handleKeyDown}
            onFocus={handleTrailingActionFocus}
            ref={trailingActionElRef}
          >
            <FocusRing styles={trailingActionFocusRingStyles} />
            <Ripple
              styles={trailingActionRippleStyles}
              disabled={disabled}
              visualState={trailingActionVisualState}
            />
            <span
              {...styleProps([
                'icon',
                'icon$trailing',
                disabled
                  ? 'icon$disabled'
                  : selected && 'icon$trailing$selected',
              ])}
              aria-hidden='true'
            >
              {deleting ? (
                <div {...styleProps(['overlay'])}>
                  <IndeterminateCircularProgressIndicator
                    styles={circularProgressIndicatorStyles}
                  />
                </div>
              ) : (
                <XMark aria-hidden='true' />
              )}
            </span>
            <span {...styleProps(['touchTarget'])}></span>
          </button>
        ) : null}
      </div>
    </div>
  );
};
