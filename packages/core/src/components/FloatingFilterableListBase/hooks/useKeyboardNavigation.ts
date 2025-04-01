import { useCallback, useRef } from 'react';

import type { IAny } from '~/utils/types';

interface IUseKeyboardNavigationProps {
  opened: boolean;
  activeIndex: number | null;
  elementsRef: React.RefObject<Array<HTMLElement | null>>;
  closeOnSelect?: boolean;
  inputFilterRef: React.RefObject<HTMLInputElement | null>;
  onItemSelect: (item: IAny, event?: React.SyntheticEvent<HTMLElement>) => void;
}

interface IUseKeyboardNavigationResult {
  getInputKeyDownHandler: (
    userHandler?: React.KeyboardEventHandler<HTMLInputElement>,
  ) => React.KeyboardEventHandler<HTMLInputElement>;
  getInputKeyUpHandler: (
    userHandler?: React.KeyboardEventHandler<HTMLInputElement>,
  ) => React.KeyboardEventHandler<HTMLInputElement>;
}

export function useKeyboardNavigation(
  props: IUseKeyboardNavigationProps,
): IUseKeyboardNavigationResult {
  const { opened, activeIndex, elementsRef } = props;

  const isEnterKeyPressedRef = useRef(false);

  const getInputKeyDownHandler = useCallback(
    (userHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void) =>
      (event: React.KeyboardEvent<HTMLInputElement>): void => {
        switch (event.key) {
          case 'Enter':
            if (opened) {
              event.preventDefault();
              isEnterKeyPressedRef.current = true;
            } else {
              userHandler?.(event);
            }
            break;

          case ' ':
            // Prevent space from filtering when navigating.
            if (opened && activeIndex !== null) {
              event.preventDefault();
            }
            break;

          default:
            userHandler?.(event);
        }
      },
    [opened, activeIndex],
  );

  // Handle keyup events on the input filter.
  const getInputKeyUpHandler = useCallback(
    (userHandler?: (event: React.KeyboardEvent<HTMLInputElement>) => void) =>
      (event: React.KeyboardEvent<HTMLInputElement>): void => {
        if (
          opened &&
          event.key === 'Enter' &&
          activeIndex != null &&
          isEnterKeyPressedRef.current
        ) {
          // We handle ENTER in keyup here to play nice with the Button
          // component's keyboard clicking. If we were to instead process ENTER
          // on keydown, then Button would click itself on keyup and the Select
          // popover would re-open.
          event.preventDefault();
          elementsRef.current[activeIndex]?.click();
          isEnterKeyPressedRef.current = false;
        } else {
          userHandler?.(event);
        }
      },
    [opened, activeIndex, elementsRef],
  );

  return {
    getInputKeyDownHandler,
    getInputKeyUpHandler,
  };
}
