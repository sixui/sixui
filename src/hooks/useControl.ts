import * as React from 'react';

export const useControl = (
  hostRef: React.RefObject<HTMLElement>,
  htmlFor?: string,
): Element | undefined => {
  const [control, setControl] = React.useState<Element>();

  React.useEffect(() => {
    setControl(
      (htmlFor
        ? hostRef.current?.parentElement?.querySelector<HTMLElement>(
            `#${htmlFor}`,
          )
        : hostRef.current?.parentElement) ?? undefined,
    );
  }, [hostRef, htmlFor]);

  return control;
};
