import { accumulate } from '@olivierpascal/helpers';
import { useCallback, useState } from 'react';

export type IVisualState = {
  hovered?: boolean;
  focused?: boolean;
  pressed?: boolean;
  dragged?: boolean;
  strategy?: 'accumulate' | 'override' | 'replace';
};

export type IUseVisualStateResult = {
  visualState: IVisualState;
  setRef: (element: Element | null) => void;
};

export type IVisualStateOptions = {
  retainFocusAfterClick?: boolean;
  disabled?: boolean;
};

// Used to handle overlapping surfaces.
let activeTarget: EventTarget | null = null;

export const useVisualState = (
  visualState?: IVisualState,
  options?: IVisualStateOptions,
): IUseVisualStateResult => {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  const handleMouseEnter = useCallback(() => setHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    setPressed(false);
  }, []);
  const handleFocus = useCallback(
    () => setFocused(options?.retainFocusAfterClick ? true : !pressed),
    [options?.retainFocusAfterClick, pressed],
  );
  const handleBlur = useCallback(() => setFocused(false), []);
  const handleMouseDown = useCallback((event: MouseEvent | Event) => {
    const pressed = !activeTarget && (event as MouseEvent).button === 0;
    setPressed(pressed);
    activeTarget = event.target;
  }, []);
  const handleMouseUp = useCallback(() => {
    setPressed(false);
    activeTarget = null;
  }, []);
  const handleKeyDown = useCallback((event: KeyboardEvent | Event) => {
    const pressed = !activeTarget && (event as KeyboardEvent).key === ' ';
    setPressed(pressed);
    activeTarget = event.target;
  }, []);
  const handleKeyUp = useCallback(() => {
    setPressed(false);
    activeTarget = null;
  }, []);

  const setRef = useCallback(
    (element: Element | null) => {
      if (
        element &&
        !options?.disabled &&
        visualState?.strategy !== 'replace'
      ) {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('focus', handleFocus);
        element.addEventListener('blur', handleBlur);
        element.addEventListener('mousedown', handleMouseDown);
        element.addEventListener('mouseup', handleMouseUp);
        element.addEventListener('keydown', handleKeyDown);
        element.addEventListener('keyup', handleKeyUp);

        return () => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
          element.removeEventListener('focus', handleFocus);
          element.removeEventListener('blur', handleBlur);
          element.removeEventListener('mousedown', handleMouseDown);
          element.removeEventListener('mouseup', handleMouseUp);
          element.removeEventListener('keydown', handleKeyDown);
          element.removeEventListener('keyup', handleKeyUp);
        };
      }
    },
    [
      options?.disabled,
      visualState?.strategy,
      handleMouseEnter,
      handleMouseLeave,
      handleFocus,
      handleBlur,
      handleMouseDown,
      handleMouseUp,
      handleKeyDown,
      handleKeyUp,
    ],
  );

  const newVisualState =
    visualState?.strategy === 'replace'
      ? visualState
      : {
          ...accumulate(
            { focused, hovered, pressed, dragged: false },
            visualState,
          ),
          ...(visualState?.strategy === 'override' ? visualState : undefined),
        };

  if (newVisualState.dragged) {
    return {
      visualState: {
        ...newVisualState,
        hovered: false,
        pressed: false,
      },
      setRef,
    };
  }

  return {
    visualState: newVisualState,
    setRef,
  };
};
