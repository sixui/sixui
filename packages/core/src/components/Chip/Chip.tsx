import { useCallback, useRef, useState } from 'react';

import type { IChipFactory } from './Chip.types';
import { iconCheckmark, iconXMark } from '~/assets/icons';
import { Avatar } from '~/components/Avatar';
import { Button } from '~/components/Button';
import { IconButton } from '~/components/IconButton';
import { SvgIcon } from '~/components/SvgIcon';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { chipTheme, IChipThemeFactory } from './Chip.css';

const COMPONENT_NAME = 'Chip';

export const Chip = polymorphicComponentFactory<IChipFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'assist',
      selected: selectedProp,
      elevated: elevatedProp,
      loading: loadingProp,
      trailingLoading: trailingLoadingProp,
      animatedLeadingIconSlot: animatedLeadingIconSlotProp,
      trailingIcon,
      onTrailingClick,
      imageUrl,
      icon,
      onClick,
      avatar: avatarProp,
      readOnly: readOnlyProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [handlingClick, setHandlingClick] = useState(false);
    const [handlingDelete, setHandlingDelete] = useState(false);

    const loading = loadingProp || handlingClick;
    const hasTrailingAction = variant === 'input' && onTrailingClick;
    const trailingLoading =
      !loading && hasTrailingAction && (trailingLoadingProp || handlingDelete);
    const readOnly = readOnlyProp || loading || trailingLoading;
    const disabledOrReadOnly = other.disabled || readOnly;

    const primaryActionRef = useRef<HTMLElement>(null);
    const primaryHandleRef = useMergeRefs(forwardedRef, primaryActionRef);
    const trailingActionRef = useRef<HTMLDivElement>(null);

    const elevated = variant !== 'input' && elevatedProp;
    const selectable = variant === 'filter' || variant === 'input';
    const selected = selectable && selectedProp;
    const isAvatar = !!imageUrl && avatarProp;
    const animatedLeadingIconSlot =
      animatedLeadingIconSlotProp ?? variant === 'filter';

    const { getStyles } = useComponentTheme<IChipThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: chipTheme,
      modifiers: {
        elevated,
        avatar: isAvatar,
        selected,
        disabled: disabledOrReadOnly,
      },
    });

    const leadingIcon =
      variant === 'filter' && selected ? (
        <SvgIcon icon={iconCheckmark} />
      ) : imageUrl ? (
        <Avatar {...getStyles('avatar')} src={imageUrl} />
      ) : (
        icon
      );

    const handleClick: React.MouseEventHandler = useCallback(
      (event) => {
        if (handlingClick || !onClick) {
          return;
        }

        void executeLazyPromise(() => onClick(event), setHandlingClick);
      },
      [handlingClick, onClick],
    );

    const handleTrailingClick = useCallback(
      (event: React.MouseEvent) => {
        if (handlingDelete) {
          return;
        }
        setHandlingDelete(true);
        Promise.resolve()
          .then(() => onTrailingClick?.(event))
          .catch((error: unknown) => {
            throw error;
          })
          .finally(() => {
            setHandlingDelete(false);
          });
      },
      [onTrailingClick, handlingDelete],
    );

    // https://github.com/material-components/material-web/blob/035d1553662812e2dcc12aea8d70ea8bf26b164b/chips/internal/multi-action-chip.ts#L74
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLElement>) => {
        const primaryActionEl = primaryActionRef.current;
        const trailingActionEl = trailingActionRef.current;
        if (!primaryActionEl || !trailingActionEl) {
          // Does not have multiple actions.
          return;
        }

        const backwards = event.key === 'ArrowLeft';
        const forwards = event.key === 'ArrowRight';

        // Ignore non-navigation keys.
        if (!backwards && !forwards) {
          return;
        }

        // Check if moving forwards or backwards.
        const isPrimaryFocused = primaryActionEl.matches(':focus');
        const isTrailingFocused = trailingActionEl.matches(':focus');

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
      const primaryActionEl = primaryActionRef.current;
      const trailingActionEl = trailingActionRef.current;
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

    const renderActionButton = useCallback(
      () => (
        <IconButton
          as="div"
          icon={trailingIcon ?? <SvgIcon icon={iconXMark} />}
          onClick={handleTrailingClick}
          loading={trailingLoading}
          disabled={disabledOrReadOnly}
          tabIndex={-1}
          ref={trailingActionRef}
          onFocus={handleTrailingActionFocus}
          {...getStyles('actionButton')}
        />
      ),
      [
        trailingIcon,
        getStyles,
        handleTrailingClick,
        trailingLoading,
        disabledOrReadOnly,
        handleTrailingActionFocus,
      ],
    );

    return (
      <Button
        {...getStyles('root')}
        variant={false}
        classNames={classNames}
        leadingIcon={leadingIcon}
        onClick={handleClick}
        loading={loading}
        ref={primaryHandleRef}
        endSlot={hasTrailingAction && renderActionButton()}
        trailingIcon={!hasTrailingAction && trailingIcon}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        animatedLeadingIconSlot={animatedLeadingIconSlot}
        {...other}
      />
    );
  },
);

Chip.theme = chipTheme;
Chip.displayName = `@sixui/${COMPONENT_NAME}`;
