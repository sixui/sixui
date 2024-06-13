import { useEffect, useRef } from 'react';

export type IUserHideBodyScrollProps = {
  disabled?: boolean;
};

export const useHideBodyScroll = (props: IUserHideBodyScrollProps): void => {
  const { disabled = false } = props;
  const savedOverflowStateRef = useRef<string>(document.body.style.overflow);

  useEffect(() => {
    if (!disabled) {
      document.body.style.overflow = 'hidden';
    }

    const savedOverflowState = savedOverflowStateRef.current;

    return () => {
      document.body.style.overflow = savedOverflowState;
    };
  }, [disabled]);
};
