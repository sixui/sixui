import { useState } from 'react';
import { createPortal } from 'react-dom';

import type { IFrameThemeFactory } from './Frame.css';
import type { IFrameFactory } from './Frame.types';
import { Box } from '~/components/Box';
import { Responsive } from '~/components/Responsive';
import {
  ThemeProvider,
  useComponentTheme,
  useProps,
} from '~/components/ThemeProvider';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './Frame.constants';
import { useParentStyles } from './useParentStyles';
import { frameTheme } from './Frame.css';

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
    // TODO: fix "forwardRef render functions accept exactly two parameters:
    // props and ref. Did you forget to use the ref parameter?" error
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
            <ThemeProvider stylesTarget={iframeDocument.documentElement}>
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
