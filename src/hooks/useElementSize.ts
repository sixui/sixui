import { useEffect, useState } from 'react';

import type { ISize } from '@/helpers/types';

export type IUseElementSizeProps = {
  ref: React.RefObject<HTMLElement>;
  observe?: boolean;
};

const getElementSize = (element: HTMLElement): ISize => {
  const prevOverflow = element.style.overflow;
  const prevPosition = element.style.position;

  // eslint-disable-next-line no-param-reassign
  element.style.overflow = 'hidden';
  // eslint-disable-next-line no-param-reassign
  element.style.position = 'absolute';

  const width = element.clientWidth;
  const height = element.clientHeight;

  // eslint-disable-next-line no-param-reassign
  element.style.overflow = prevOverflow;
  // eslint-disable-next-line no-param-reassign
  element.style.position = prevPosition;

  return { width, height };
};

export const useElementSize = (
  props: IUseElementSizeProps,
): ISize | undefined => {
  const { ref: elementRef, observe } = props;
  const [size, setSize] = useState<ISize | undefined>(
    elementRef.current ? getElementSize(elementRef.current) : undefined,
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    if (observe) {
      const resizeObserver = new ResizeObserver(() => {
        const size = getElementSize(element);
        setSize(size);
      });
      resizeObserver.observe(elementRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [elementRef, observe]);

  return size;
};
