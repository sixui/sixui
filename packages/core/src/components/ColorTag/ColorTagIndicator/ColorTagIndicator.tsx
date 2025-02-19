import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagIndicatorThemeFactory } from './ColorTagIndicator.css';
import type { IColorTagIndicatorFactory } from './ColorTagIndicator.types';
import { Diagonals } from '~/components/Diagonals';
import { Paper } from '~/components/Paper';
import { useComponentTheme, useProps } from '~/components/Theme';
import { getTextContrastColor } from '~/utils/colors/getTextContrastColor';
import { isValidHexColor } from '~/utils/colors/isValidHexColor';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './ColorTagIndicator.constants';
import { colorTagIndicatorTheme } from './ColorTagIndicator.css';

export const ColorTagIndicator =
  polymorphicComponentFactory<IColorTagIndicatorFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        children,
        color,
        outlined,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const isEmpty = !color;
      const isValid = !!color && isValidHexColor(color);
      const contrastColor = isValid ? getTextContrastColor(color) : undefined;

      const { getStyles } = useComponentTheme<IColorTagIndicatorThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: colorTagIndicatorTheme,
        modifiers: {
          empty: isEmpty,
          invalid: !isValid,
          outlined,
        },
      });

      return (
        <Paper
          {...getStyles('root', {
            style: assignInlineVars({
              [colorTagIndicatorTheme.tokens.container.color.normal]: color,
              [colorTagIndicatorTheme.tokens.outline.color.normal]:
                contrastColor,
            }),
          })}
          ref={forwardedRef}
          {...other}
        >
          <Diagonals {...getStyles('diagonals')} />
          {children}
        </Paper>
      );
    },
  );

ColorTagIndicator.theme = colorTagIndicatorTheme;
ColorTagIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
