import type { IPoint } from '~/helpers/types';
import { getNormalizedPointerEventCoords } from './getNormalizedPointerEventCoords';

export type ITranslationCoordinates = {
  startPoint: IPoint;
  endPoint: IPoint;
};

export const getTranslationCoordinates = (
  triggerElement: HTMLElement,
  surfaceElement: HTMLElement,
  event: React.PointerEvent | React.MouseEvent,
  initialSize: number,
): ITranslationCoordinates => {
  const triggerRect = triggerElement.getBoundingClientRect();

  // End in the center
  const endPoint = {
    x: (triggerRect.width - initialSize) / 2,
    y: (triggerRect.height - initialSize) / 2,
  };

  const startPoint = getNormalizedPointerEventCoords(
    surfaceElement,
    event as React.PointerEvent,
  );

  const centeredStartPoint = {
    x: startPoint.x - initialSize / 2 - window.scrollX,
    y: startPoint.y - initialSize / 2 - window.scrollY,
  };

  return { startPoint: centeredStartPoint, endPoint };
};
