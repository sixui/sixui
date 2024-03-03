import { useCallback, useEffect, useState } from 'react';

export type IVisualState = {
  hovered?: boolean;
  focused?: boolean;
  pressed?: boolean;
  dragged?: boolean;
};

export type IVisualStateOptions = {
  retainFocusAfterClick?: boolean;
};

/**
 * @deprecated
 */
export const useVisualState = (
  elementRef?: React.RefObject<HTMLElement>,
  options?: IVisualStateOptions,
): IVisualState => {
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
    [options, pressed],
  );
  const handleBlur = useCallback(() => setFocused(false), []);
  const handleMouseDown = useCallback(
    (event: MouseEvent) => setPressed(event.button === 0),
    [],
  );
  const handleMouseUp = useCallback(() => setPressed(false), []);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => setPressed(event.key === ' '),
    [],
  );
  const handleKeyUp = useCallback(() => setPressed(false), []);

  useEffect(() => {
    const element = elementRef?.current;
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
  }, [
    elementRef,
    handleMouseEnter,
    handleMouseLeave,
    handleFocus,
    handleBlur,
    handleMouseDown,
    handleMouseUp,
    handleKeyDown,
    handleKeyUp,
  ]);

  return { focused, hovered, pressed };
};
