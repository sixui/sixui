import { useMergeRefs } from '@floating-ui/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import type { IFrameProps } from './Frame.types';
import { Base } from '../Base';

export const Frame = forwardRef<HTMLIFrameElement, IFrameProps>(
  function Iframe(props, forwardedRef) {
    const { children, importParentStyles, ...other } = props;
    const [iframeElement, setIframeElement] =
      useState<HTMLIFrameElement | null>(null);
    const handleRef = useMergeRefs([
      forwardedRef,
      (element: HTMLIFrameElement | null) => setIframeElement(element),
    ]);

    const iframeDocument = iframeElement?.contentWindow?.document;

    const stylesInjected = useRef(false);
    useEffect(() => {
      if (!importParentStyles || stylesInjected.current || !iframeDocument) {
        return;
      }
      stylesInjected.current = true;

      const parentTopRules: Array<string> = [];

      const parentStyleSheets = document.styleSheets;
      const parentRules = [...parentStyleSheets]
        .map((parentStyleSheet) =>
          [...parentStyleSheet.cssRules].map((cssRule) => {
            const text = cssRule.cssText;
            // @import and @charset rules must be on top of the CSS.
            if (text.startsWith('@import') || text.startsWith('@charset')) {
              parentTopRules.push(text);

              return `/* Moved on top: ${text} */`;
            }

            return text;
          }),
        )
        .flat();
      const parentCssString = [...parentTopRules, ...parentRules].join('\n\n');

      const styles = iframeDocument.createElement('style');
      styles.innerHTML = `${parentCssString}`;
      styles.setAttribute('type', 'text/css');

      const iframeHead = iframeDocument.getElementsByTagName('head')[0];
      iframeHead.appendChild(styles);
    });

    return (
      <Base as='iframe' {...other} ref={handleRef}>
        {iframeDocument ? createPortal(children, iframeDocument.body) : null}
      </Base>
    );
  },
);
