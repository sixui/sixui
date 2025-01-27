import type { IPoint } from '~/helpers/types';

export const getNormalizedPointerEventCoords = (
  surfaceElement: HTMLElement,
  pointerEvent: React.PointerEvent,
): IPoint => {
  const surfaceRect = surfaceElement.getBoundingClientRect();

  const { pageX, pageY } = pointerEvent;
  if (!pageX || !pageY) {
    return {
      x: surfaceRect.width / 2,
      y: surfaceRect.height / 2,
    };
  }

  const surfaceDocumentX = surfaceRect.left;
  const surfaceDocumentY = surfaceRect.top;

  const coords = {
    x: pageX - surfaceDocumentX - window.scrollX,
    y: pageY - surfaceDocumentY - window.scrollY,
  };

  return coords;
};
