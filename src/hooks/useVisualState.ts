import { accumulate } from '@olivierpascal/helpers';
import { useCallback, useEffect, useState } from 'react';

export type IVisualState = {
  hovered?: boolean;
  focused?: boolean;
  pressed?: boolean;
  dragged?: boolean;
};

export type IUseVisualStateResult<TElement> = {
  visualState: IVisualState;
  ref: (element: TElement) => void;
};

export type IVisualStateOptions = {
  retainFocusAfterClick?: boolean;
  disabled?: boolean;
};

// Used to handle overlapping surfaces.
let activeTarget: EventTarget | null = null;

export const useVisualState = <TElement extends Element = HTMLElement>(
  inheritedVisualState?: IVisualState,
  options?: IVisualStateOptions,
): IUseVisualStateResult<TElement> => {
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

  useEffect(() => {
    if (options?.disabled) {
      setHovered(false);
      setFocused(false);
      setPressed(false);
    }
  }, [options?.disabled]);

  const ref = useCallback(
    (element: TElement) => {
      if (!element) {
        return;
      }

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      element.addEventListener('focus', handleFocus);
      element.addEventListener('blur', handleBlur);
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('keydown', handleKeyDown);
      element.addEventListener('keyup', handleKeyUp);
    },
    [
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

  if (options?.disabled) {
    return {
      visualState: {
        hovered: false,
        focused: false,
        pressed: false,
      },
      ref,
    };
  }

  const accumulatedVisualState = accumulate(
    { focused, hovered, pressed, dragged: false },
    inheritedVisualState,
  );

  if (accumulatedVisualState.dragged) {
    return {
      visualState: {
        ...accumulatedVisualState,
        hovered: false,
        pressed: false,
      },
      ref,
    };
  }

  return {
    visualState: accumulatedVisualState,
    ref,
  };
};
