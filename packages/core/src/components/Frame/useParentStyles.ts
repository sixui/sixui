import { useState } from 'react';

import { useTimeout } from '~/hooks/useTimeout';

export type IUseParentStylesProps = {
  disabled?: boolean;
};

export const useParentStyles = (
  props?: IUseParentStylesProps,
): string | undefined => {
  const [stylesAsString, setStylesAsString] = useState<string>();

  // As some libraries may inject styles after the component is mounted, we need
  // to wait a bit before getting the styles.
  useTimeout(() => {
    if (props?.disabled) {
      return undefined;
    }

    const parentTopRules: Array<string> = [];

    const parentStyleSheets = document.styleSheets;
    const parentRules = [...parentStyleSheets]
      .map((parentStyleSheet) =>
        [...parentStyleSheet.cssRules].map((cssRule) => {
          const text = cssRule.cssText;
          // @import and @charset rules must be on top of the CSS so they are
          // moved.
          if (text.startsWith('@import') || text.startsWith('@charset')) {
            parentTopRules.push(text);

            return `/* Moved on top: ${text} */`;
          }

          return text;
        }),
      )
      .flat();
    const parentStylesAsString = [...parentTopRules, ...parentRules].join(
      '\n\n',
    );

    setStylesAsString(parentStylesAsString);
  }, 0);

  return stylesAsString;
};
