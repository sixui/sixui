import { useCallback, useEffect, useState } from 'react';

export type IValidationState = {
  reportValidity: () => boolean;
  nativeErrorText?: string;
};

export type IValidationStateOptions = {
  //
};

export const useValidationState = (
  elementRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>,
  // options?: IValidationStateOptions,
): IValidationState => {
  const [nativeErrorText, setNativeErrorText] = useState<string>();

  /**
   * Handle validation of the element, either by the browser if the element is in an invalid state
   * (through `invalid` event), or manually (via `reportValidity()`).
   */
  const handleValidation = useCallback(
    (invalidEvent: Event | null) => {
      // Cancel validation if the event was default prevented.
      if (invalidEvent?.defaultPrevented) {
        return;
      }

      if (invalidEvent) {
        // The element is in an invalid state. Prevent default pop-up behavior. This also prevents
        // focusing.
        invalidEvent.preventDefault();

        // As the focus should be bring on the first invalid element (rather than the last), prefer
        // letting the form to focus the first invalid element on submit.
        // elementRef.current?.focus();
      }

      setNativeErrorText(elementRef.current?.validationMessage);
    },
    [elementRef],
  );

  /**
   * Report validity of the element.
   */
  const reportValidity = useCallback(() => {
    // If the element is valid, report validity to clear any existing error.
    // The `invalid` event listener will handle reporting invalid events.

    const isValid = elementRef.current?.reportValidity() ?? false;
    if (isValid) {
      handleValidation(null);
    }

    return isValid;
  }, [elementRef, handleValidation]);

  /**
   * Called when the element is in an invalid sate.
   */
  const handleInvalid = useCallback(
    (invalidEvent: Event) => {
      // Only handle events that were dispatched by the user agent.
      if (!invalidEvent.isTrusted) {
        return;
      }

      elementRef.current?.addEventListener(
        'invalid',
        () => {
          // A normal bubbling phase event listener. By adding it here, we ensure it's the last
          // event listener that is called during the bubbling phase.
          handleValidation(invalidEvent);
        },
        { once: true },
      );
    },
    [elementRef, handleValidation],
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    element.addEventListener('invalid', handleInvalid, {
      // Listen during the capture phase, which will happen before the bubbling phase. That way,
      // we can add a final event listener that will run after other event listeners, and we can
      // check if it was default prevented. This works because invalid does not bubble.
      capture: true,
    });

    return () => {
      element.removeEventListener('invalid', handleInvalid);
    };
  }, [elementRef, handleInvalid]);

  return {
    reportValidity,
    nativeErrorText,
  };
};
