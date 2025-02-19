export const isEventInElementBounds = (
  event: React.PointerEvent,
  element: HTMLElement,
): boolean => {
  const { top, left, bottom, right } = element.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;

  return x >= left && x <= right && y >= top && y <= bottom;
};
