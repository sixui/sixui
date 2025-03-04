import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IStringFromStylesMediaQuery } from '~/utils/css';
import type { ISimpleGridOwnProps } from './SimpleGrid.types';
import { InlineStyles } from '~/components/InlineStyles';
import { useThemeContext } from '~/components/Theme/Theme.context';
import { getWindowSizeClassRanges, space } from '~/utils/css';
import { getStylePropBaseValue } from '~/utils/getStylePropBaseValue';
import { keys } from '~/utils/keys';
import { simpleGridTheme } from './SimpleGrid.css';

export interface ISimpleGridInlineStylesProps extends ISimpleGridOwnProps {
  selector: string;
}

export const SimpleGridInlineStyles: React.FC<ISimpleGridInlineStylesProps> = (
  props,
) => {
  const { selector, cols, spacing, verticalSpacing } = props;

  const { theme } = useThemeContext();

  const windowSizeClassRanges = getWindowSizeClassRanges(
    theme.windowSizeClasses,
  );

  const spacingBaseValue = getStylePropBaseValue(spacing);
  const spacingTokenValue = spacingBaseValue
    ? space(spacingBaseValue)
    : undefined;
  const verticalSpacingBaseValue = getStylePropBaseValue(verticalSpacing);
  const verticalSpacingTokenValue = verticalSpacingBaseValue
    ? space(verticalSpacingBaseValue)
    : spacingTokenValue;

  return (
    <InlineStyles
      selector={selector}
      styles={assignInlineVars({
        [simpleGridTheme.tokens.cols]: getStylePropBaseValue(cols)?.toString(),
        [simpleGridTheme.tokens.horizontalSpacing]: spacingTokenValue,
        [simpleGridTheme.tokens.verticalSpacing]: verticalSpacingTokenValue,
      })}
      mediaQueries={keys(windowSizeClassRanges).reduce<
        Array<IStringFromStylesMediaQuery>
      >(
        (acc, rangeName) => [
          ...acc,
          {
            query: windowSizeClassRanges[rangeName].query,
            styles: {
              [simpleGridTheme.tokens.cols]:
                typeof cols === 'object' && cols[rangeName]
                  ? String(cols[rangeName])
                  : undefined,
              [simpleGridTheme.tokens.horizontalSpacing]:
                typeof spacing === 'object' && spacing[rangeName]
                  ? space(spacing[rangeName])
                  : undefined,
              [simpleGridTheme.tokens.verticalSpacing]:
                typeof verticalSpacing === 'object' &&
                verticalSpacing[rangeName]
                  ? space(verticalSpacing[rangeName])
                  : undefined,
            },
          },
        ],
        [],
      )}
    />
  );
};
