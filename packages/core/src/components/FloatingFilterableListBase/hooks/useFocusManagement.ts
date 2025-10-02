import { useCallback, useEffect, useState } from 'react';

interface IUseFocusManagementProps {
  resetOnBlur?: boolean;
  opened: boolean;
  setQuery: (query: string) => void;
  onFocusChange?: (hasFocus: boolean) => void;
  autoFocusRef: React.RefObject<HTMLElement | null>;
  triggerRef: React.RefObject<HTMLElement | null>;
}

interface IUseFocusManagementResult {
  hasFocus: boolean;
  handleFocus: (event?: React.FocusEvent) => void;
  handleBlur: (event?: React.FocusEvent) => void;
  focusAfterOperation: () => void;
  getFocusProps: <T extends Element = Element>(
    userProps?: React.HTMLProps<T>,
  ) => React.HTMLProps<T>;
}

export function useFocusManagement(
  props: IUseFocusManagementProps,
): IUseFocusManagementResult {
  const {
    resetOnBlur = false,
    opened,
    setQuery,
    onFocusChange,
    autoFocusRef,
    triggerRef,
  } = props;

  const [hasFocus, setHasFocus] = useState(false);

  const handleFocus = useCallback(
    (_event?: React.FocusEvent): void => {
      setHasFocus(true);
      onFocusChange?.(true);
    },
    [onFocusChange],
  );

  const handleBlur = useCallback(
    (_event?: React.FocusEvent): void => {
      setHasFocus(false);
      onFocusChange?.(false);

      if (resetOnBlur && !opened) {
        setQuery('');
      }
    },
    [resetOnBlur, opened, setQuery, onFocusChange],
  );

  const focusAfterOperation = useCallback((): void => {
    if (autoFocusRef.current) {
      autoFocusRef.current.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [autoFocusRef, triggerRef]);

  const getFocusProps = useCallback(
    <T extends Element = Element>(
      userProps?: React.HTMLProps<T>,
    ): React.HTMLProps<T> => ({
      ...userProps,
      onFocus: (event: React.FocusEvent<T>) => {
        handleFocus(event);
        userProps?.onFocus?.(event);
      },
      onBlur: (event: React.FocusEvent<T>) => {
        handleBlur(event);
        userProps?.onBlur?.(event);
      },
    }),
    [handleFocus, handleBlur],
  );

  useEffect(() => {
    onFocusChange?.(hasFocus);
  }, [hasFocus, onFocusChange]);

  return {
    hasFocus,
    handleFocus,
    handleBlur,
    focusAfterOperation,
    getFocusProps,
  };
}
