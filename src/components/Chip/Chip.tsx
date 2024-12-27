import { useCallback, useRef, useState } from 'react';

import type { IChipFactory } from './Chip.types';
import { iconCheckMark, iconXMark } from '~/assets/icons';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
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
      deleting: deletingProp,
      onDelete,
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
    const canDelete = variant === 'input' && onDelete;
    const deleting = !loading && canDelete && (deletingProp || handlingDelete);
    const readOnly = readOnlyProp || loading || deleting;
    const disabledOrReadOnly = other.disabled || readOnly;

    const primaryActionRef = useRef<HTMLElement>(null);
    const primaryHandleRef = useMergeRefs(forwardedRef, primaryActionRef);
    const trailingActionRef = useRef<HTMLDivElement>(null);

    const elevated = variant !== 'input' && elevatedProp;
    const hasIcon = !!imageUrl || !!icon;
    const selectable = variant === 'filter' || variant === 'input';
    const selected = selectable && selectedProp;
    const hasLeading =
      (variant === 'filter' && (loading || selected)) || hasIcon;
    const isAvatar = !!imageUrl && avatarProp;

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
      },
    });

    const leadingIcon =
      variant === 'filter' && selected ? (
        <SvgIcon icon={iconCheckMark} />
      ) : imageUrl ? (
        <Avatar {...getStyles('avatar')} src={imageUrl} />
      ) : (
        icon
      );

    const handleClick: React.MouseEventHandler<Element> = useCallback(
      (event) => {
        if (handlingClick || !onClick) {
          return;
        }

        void executeLazyPromise(() => onClick(event) as void, setHandlingClick);
      },
      [handlingClick, onClick],
    );

    const handleDelete = useCallback(
      (event: React.MouseEvent<Element>) => {
        if (handlingDelete) {
          return;
        }
        setHandlingDelete(true);
        Promise.resolve(onDelete?.(event))
          .finally(() => setHandlingDelete(false))
          .catch((error: Error) => {
            throw error;
          });
      },
      [onDelete, handlingDelete],
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
        const isPrimaryFocused = primaryActionEl?.matches(':focus');
        const isTrailingFocused = trailingActionEl?.matches(':focus');

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

    const renderDeleteButton = useCallback(
      () => (
        <IconButton
          as="div"
          icon={<SvgIcon icon={iconXMark} />}
          onClick={handleDelete}
          loading={deleting}
          disabled={disabledOrReadOnly}
          tabIndex={-1}
          ref={trailingActionRef}
          onFocus={handleTrailingActionFocus}
          {...getStyles('deleteButton')}
        />
      ),
      [
        getStyles,
        handleDelete,
        deleting,
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
        onClick={onClick ? handleClick : undefined}
        loading={loading}
        ref={primaryHandleRef}
        hasLeading={hasLeading}
        end={canDelete && renderDeleteButton()}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        {...other}
      />
    );
  },
);

Chip.theme = chipTheme;
Chip.displayName = `@sixui/${COMPONENT_NAME}`;
