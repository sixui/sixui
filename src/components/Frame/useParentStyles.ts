import { useMemo } from 'react';

export type IUseParentStylesProps = {
  disabled?: boolean;
};

export const useParentStyles = (
  props?: IUseParentStylesProps,
): string | undefined => {
  const stylesAsString = useMemo(() => {
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

    return parentStylesAsString;
  }, [props?.disabled]);

  return stylesAsString;
};
