import { useState } from 'react';
import { createPortal } from 'react-dom';

import type { IFrameFactory } from './Frame.types';
import { Box } from '~/components/Box';
import { Responsive } from '~/components/Responsive';
import { ThemeProvider, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './Frame.constants';
import { useParentStyles } from './useParentStyles';

export const Frame = componentFactory<IFrameFactory>((props, forwardedRef) => {
  const { children, importParentStyles, ...other } = useProps({
    componentName: COMPONENT_NAME,
    props,
  });

  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null,
  );
  const handleRef = useMergeRefs(
    forwardedRef,
    (element: HTMLIFrameElement | null) => {
      setIframeElement(element);
    },
  );
  const parentStyles = useParentStyles({
    disabled: !importParentStyles,
  });

  const iframeDocument = iframeElement?.contentWindow?.document;
  const iframeContentWindow = iframeElement?.contentWindow;

  const [, setLoadedAt] = useState<number>(Date.now());
  const handleLoad = (): void => {
    setLoadedAt(Date.now());
  };

  return (
    <Box as="iframe" ref={handleRef} onLoad={handleLoad} {...other}>
      {iframeContentWindow && iframeDocument && (
        <>
          {createPortal(
            <ThemeProvider
              getRootElement={() => iframeDocument.documentElement}
              cssVariablesSelector=":root"
              inherit={importParentStyles}
            >
              <Responsive>
                {isFunction(children)
                  ? children({ window: iframeContentWindow })
                  : children}
              </Responsive>
            </ThemeProvider>,
            iframeDocument.body,
          )}

          {parentStyles &&
            createPortal(
              <style
                type="text/css"
                data-sixui-styles={COMPONENT_NAME}
                dangerouslySetInnerHTML={{ __html: parentStyles }}
              />,
              iframeDocument.head,
            )}
        </>
      )}
    </Box>
  );
});

Frame.displayName = `@sixui/core/${COMPONENT_NAME}`;
