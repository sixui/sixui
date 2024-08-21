import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { IFrameProps } from './Frame.types';
import { isFunction } from '~/helpers/isFunction';
import { Base } from '../Base';
import { ResponsiveStyles } from '../Theme/ResponsiveStyles';
import { useParentStyles } from './useParentStyles';

export const Frame = forwardRef<HTMLIFrameElement, IFrameProps>(
  function Iframe(props, forwardedRef) {
    const { children, importParentStyles, ...other } = props;
    const [iframeElement, setIframeElement] =
      useState<HTMLIFrameElement | null>(null);
    const handleRef = useMergeRefs([
      forwardedRef,
      (element: HTMLIFrameElement | null) => setIframeElement(element),
    ]);

    const parentStyles = useParentStyles({
      disabled: !importParentStyles,
    });

    const iframeDocument = iframeElement?.contentWindow?.document;
    const iframeContentWindow = iframeElement?.contentWindow;

    const [, setLoadedAt] = useState<number>(Date.now());
    const handleLoad = (): void => setLoadedAt(Date.now());

    return (
      <>
        <Base as='iframe' {...other} ref={handleRef} onLoad={handleLoad}>
          {iframeContentWindow && iframeDocument ? (
            <>
              {createPortal(
                <div id='sixui-root'>
                  <ResponsiveStyles />
                  {isFunction(children)
                    ? children({ window: iframeContentWindow })
                    : children}
                </div>,
                iframeDocument.body,
              )}

              {parentStyles
                ? createPortal(
                    <style type='text/css'>{parentStyles}</style>,
                    iframeDocument.head,
                  )
                : null}
            </>
          ) : null}
        </Base>
      </>
    );
  },
);
