import { useEffect, useState } from 'react';

export type IUseElementSizeProps = {
  ref: React.RefObject<HTMLElement>;
  expanded?: boolean;
};

export type IUseElementSizeResult = {
  height: number;
};

export const useElementSize = (
  props: IUseElementSizeProps,
): IUseElementSizeResult => {
  const { ref: elementRef, expanded } = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!expanded) {
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
  }, [elementRef, expanded]);

  return { height };
};
