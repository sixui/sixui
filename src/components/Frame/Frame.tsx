import { useState } from 'react';
import { createPortal } from 'react-dom';

import type { IFrameThemeFactory } from './Frame.css';
import type { IFrameFactory } from './Frame.types';
import { isFunction } from '~/helpers/isFunction';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { ThemeProvider } from '../ThemeProvider';
import { useParentStyles } from './useParentStyles';
import { frameTheme } from './Frame.css';

const COMPONENT_NAME = 'Frame';

export const Frame = componentFactory<IFrameFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant,
    children,
    importParentStyles,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const { getStyles } = useComponentTheme<IFrameThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: frameTheme,
  });

  const [iframeElement, setIframeElement] = useState<HTMLIFrameElement | null>(
    null,
  );
  const handleRef = useMergeRefs(
    forwardedRef,
    (element: HTMLIFrameElement | null) => setIframeElement(element),
  );
  const parentStyles = useParentStyles({
    disabled: !importParentStyles,
  });

  const iframeDocument = iframeElement?.contentWindow?.document;
  const iframeContentWindow = iframeElement?.contentWindow;

  const [, setLoadedAt] = useState<number>(Date.now());
  const handleLoad = (): void => setLoadedAt(Date.now());

  return (
    <Box
      {...getStyles('root')}
      as="iframe"
      ref={handleRef}
      onLoad={handleLoad}
      {...other}
    >
      {iframeContentWindow && iframeDocument && (
        <>
          {createPortal(
            <ThemeProvider inherit={false} window={iframeContentWindow}>
              {isFunction(children)
                ? children({ window: iframeContentWindow })
                : children}
            </ThemeProvider>,
            iframeDocument.body,
          )}

          {parentStyles &&
            createPortal(
              <style type="text/css">{parentStyles}</style>,
              iframeDocument.head,
            )}
        </>
      )}
    </Box>
  );
});

Frame.theme = frameTheme;
Frame.displayName = `@sixui/${COMPONENT_NAME}`;
