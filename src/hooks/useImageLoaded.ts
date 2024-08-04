import { useEffect, useState } from 'react';

export type IUseImageLoadedProps = Pick<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'crossOrigin' | 'referrerPolicy' | 'src' | 'srcSet'
>;

export type IUseImageLoadedResult = {
  loaded: boolean;
  hasLoadingError: boolean;
};

export const useImageLoaded = ({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet,
}: IUseImageLoadedProps): IUseImageLoadedResult => {
  const [loaded, setLoaded] = useState(false);
  const [hasLoadingError, setHasLoadingError] = useState(false);

  useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }

      setLoaded(true);
      setHasLoadingError(false);
    };
    image.onerror = () => {
      if (!active) {
        return;
      }

      setLoaded(false);
      setHasLoadingError(true);
    };
    image.crossOrigin = crossOrigin ?? null;
    if (src) {
      image.src = src;
    }
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (srcSet) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return { loaded, hasLoadingError };
};
