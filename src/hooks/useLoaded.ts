import * as React from 'react';

type IUseLoadedProps = Pick<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'crossOrigin' | 'referrerPolicy' | 'src' | 'srcSet'
>;

export const useLoaded = ({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet,
}: IUseLoadedProps): { loaded: boolean; hasLoadingError: boolean } => {
  const [loaded, setLoaded] = React.useState(false);
  const [hasLoadingError, setHasLoadingError] = React.useState(false);

  React.useEffect(() => {
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
