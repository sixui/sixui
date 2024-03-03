import { useCallback, useState } from 'react';

export type IVisualState = {
  hovered?: boolean;
  focused?: boolean;
  pressed?: boolean;
  dragged?: boolean;
};

export type IUseVisualStateResult = {
  visualState: IVisualState;
  ref: (node: HTMLElement) => void;
};

export type IVisualStateOptions = {
  retainFocusAfterClick?: boolean;
};

export const useVisualState = (
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

  const ref = useCallback(
    (element: HTMLElement) => {
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

  return { visualState: { focused, hovered, pressed }, ref };
};
