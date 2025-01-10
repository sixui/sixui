import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagIndicatorThemeFactory } from './ColorTagIndicator.css';
import type { IColorTagIndicatorFactory } from './ColorTagIndicator.types';
import { getTextContrastColor } from '~/helpers/colors/getTextContrastColor';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import { colorTagIndicatorTheme } from './ColorTagIndicator.css';

const COMPONENT_NAME = 'ColorTagIndicator';

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
      const contrastColor =
        !!color && isValid ? getTextContrastColor(color) : undefined;

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
          <div {...getStyles('crosshairs')} />
          <div
            style={{
              overflow: 'hidden',
              borderRadius: 'inherit',
              position: 'absolute',
              inset: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{
                height: '100%',
                width: '100%',
              }}
            >
              <line
                x1="0"
                y1="0"
                x2="100"
                y2="100"
                stroke="black"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="100"
                y1="0"
                x2="0"
                y2="100"
                stroke="black"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
          {children}
        </Paper>
      );
    },
  );

ColorTagIndicator.theme = colorTagIndicatorTheme;
ColorTagIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
