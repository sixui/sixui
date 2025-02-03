import type { IAny } from './types';
import { useIsomorphicLayoutEffect } from '~/hooks';

const dispatchEvent = (type: string, detail?: IAny): boolean =>
  window.dispatchEvent(new CustomEvent(type, { detail }));

export const createUseExternalEvents = <
  THandlers extends Record<string, (detail: IAny) => void>,
>(
  prefix: string,
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  const internalUseExternalEvents = (events: THandlers): void => {
    const handlers = Object.keys(events).reduce(
      (acc, eventKey) => ({
        ...acc,
        [`${prefix}:${eventKey}`]: (event: CustomEvent) =>
          events[eventKey]?.(event.detail),
      }),
      {} as THandlers,
    );

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useIsomorphicLayoutEffect(() => {
      Object.keys(handlers).forEach((eventKey) => {
        const handler = handlers[eventKey]!;
        window.removeEventListener(eventKey, handler);
        window.addEventListener(eventKey, handler);
      });

      return () => {
        Object.keys(handlers).forEach((eventKey) => {
          const handler = handlers[eventKey]!;
          window.removeEventListener(eventKey, handler);
        });
      };
    }, [handlers]);
  };

  function createEvent<TEventKey extends keyof THandlers>(event: TEventKey) {
    type IParameter = Parameters<THandlers[TEventKey]>[0];

    return (
      ...payload: IParameter extends undefined ? [undefined?] : [IParameter]
    ) => dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
  }

  return [internalUseExternalEvents, createEvent] as const;
};
