import { useEffect, useState } from 'react';

export type IUseElementSizeProps = {
  ref: React.RefObject<HTMLElement>;
  enabled?: boolean;
  observe?: boolean;
};

export type IUseElementSizeResult = {
  height: number;
};

export const useElementSize = (
  props: IUseElementSizeProps,
): IUseElementSizeResult => {
  const { ref: elementRef, enabled, observe } = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setHeight(0);

      return;
    }

    const element = elementRef.current;
    if (!element) {
      return;
    }

    const prevOverflow = element.style.overflow;
    element.style.overflow = 'hidden';
    const elementHeight = element.offsetHeight;
    element.style.overflow = prevOverflow;
    setHeight(elementHeight);

    if (observe) {
      const resizeObserver = new ResizeObserver(() => {
        setHeight(element.offsetHeight);
      });
      resizeObserver.observe(elementRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [elementRef, enabled, observe]);

  return { height };
};
