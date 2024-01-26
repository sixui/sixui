import React from 'react';

export type IVisualState = {
  hovered?: boolean;
  focused?: boolean;
  pressed?: boolean;
};

export type IVisualStateOptions = {
  retainFocusAfterClick?: boolean;
};

export const useVisualState = (
  elementRef: React.RefObject<HTMLElement>,
  options?: IVisualStateOptions,
): IVisualState => {
  const [hovered, setHovered] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const handleMouseEnter = React.useCallback(() => setHovered(true), []);
  const handleMouseLeave = React.useCallback(() => {
    setHovered(false);
    setPressed(false);
  }, []);
  const handleFocus = React.useCallback(
    () => setFocused(options?.retainFocusAfterClick ? true : !pressed),
    [options, pressed],
  );
  const handleBlur = React.useCallback(() => setFocused(false), []);
  const handleMouseDown = React.useCallback(
    (event: MouseEvent) => setPressed(event.button === 0),
    [],
  );
  const handleMouseUp = React.useCallback(() => setPressed(false), []);
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => setPressed(event.key === ' '),
    [],
  );
  const handleKeyUp = React.useCallback(() => setPressed(false), []);

  React.useEffect(() => {
    const element = elementRef.current;
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
