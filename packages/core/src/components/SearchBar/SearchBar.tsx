import { useRef, useState } from 'react';
import { useFocus } from 'react-aria';

import type { ISearchBarThemeFactory } from './SearchBar.css';
import type { ISearchBarFactory, ISearchBarProps } from './SearchBar.types';
import { Avatar } from '~/components/Avatar';
import { Paper } from '~/components/Paper';
import { Slot } from '~/components/Slot';
import { StateLayer, useStateLayer } from '~/components/StateLayer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { extractPaperProps } from '../Paper/extractPaperProps';
import { COMPONENT_NAME } from './SearchBar.constants';
import { searchBarTheme } from './SearchBar.css';

/**
 * @see https://m3.material.io/components/search/overview
 */
export const SearchBar = componentFactory<ISearchBarFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      interactions: interactionsProp,
      wrapperProps,
      rootRef,
      interactionsMergeStrategy,
      leadingIcon,
      trailingActions,
      trailingAvatarProps,
      loading,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { paperProps, other: forwardedProps } =
      extractPaperProps<ISearchBarProps>(other);

    const { getStyles } = useComponentTheme<ISearchBarThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: searchBarTheme,
    });

    const [focused, setFocused] = useState(false);
    const focus = useFocus({
      onFocusChange: setFocused,
    });

    const stateLayer = useStateLayer({
      baseState: interactionsProp,
      mergeStrategy: interactionsMergeStrategy,
      withoutRippleEffect: true,
      events: {
        focus: false,
      },
    });

    const rootHandleRef = useMergeRefs(rootRef, stateLayer.triggerRef);

    const inputRef = useRef<HTMLInputElement>(null);
    const inputHandleRef = useMergeRefs(inputRef, forwardedRef);

    const hasStartSlot = !!leadingIcon;
    const startSlotLoading = hasStartSlot && loading;
    const endSlotLoading = loading && !startSlotLoading;
    const hasEndSlot =
      !!trailingActions || !!trailingAvatarProps || endSlotLoading;

    // Focus the input when the user clicks on the field.
    const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
      if (focused) {
        return;
      }

      const isInput = event.target === inputRef.current;
      if (!isInput) {
        event.stopPropagation();
        inputRef.current?.focus();
        inputRef.current?.click();
      }
    };

    return (
      <Paper
        {...paperProps}
        {...getStyles('root')}
        interactions={{ ...stateLayer.interactionsContext.state, focused }}
        ref={rootHandleRef}
        {...mergeProps(
          wrapperProps,
          stateLayer.interactionsContext.triggerProps,
          { onClick: handleClick },
        )}
      >
        <StateLayer {...getStyles('stateLayer')} context={stateLayer} />

        {hasStartSlot && (
          <Slot {...getStyles('startSlot')} loading={startSlotLoading}>
            {leadingIcon}
          </Slot>
        )}

        {children}

        <input
          {...getStyles('input')}
          ref={inputHandleRef}
          {...mergeProps(focus.focusProps, forwardedProps)}
        />

        {hasEndSlot && (
          <Slot {...getStyles('endSlot')} loading={endSlotLoading}>
            {trailingActions}
            {trailingAvatarProps && (
              <Avatar {...getStyles('avatar')} {...trailingAvatarProps} />
            )}
          </Slot>
        )}
      </Paper>
    );
  },
);

SearchBar.displayName = `@sixui/core/${COMPONENT_NAME}`;
SearchBar.theme = searchBarTheme;
