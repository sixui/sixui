import { useEffect, useRef } from 'react';

// https://non-traditional.dev/how-to-use-the-forwarded-ref-in-react-1fb108f4e6af

export const useForwardedRef = <T>(
  ref: React.ForwardedRef<T>,
): React.RefObject<T> => {
  const innerRef = useRef<T>(null);

  useEffect(() => {
    if (!ref) {
      return;
    }

    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = innerRef.current;
    }
  });

  return innerRef;
};
