import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagIndicatorThemeFactory } from './ColorTagIndicator.css';
import type { IColorTagIndicatorFactory } from './ColorTagIndicator.types';
import { getTextContrastColor } from '~/helpers/colors/getTextContrastColor';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { PaperBase } from '../PaperBase';
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
        label,
        icon,
        backgroundColor: backgroundColorProp,
        foregroundColor: foregroundColorProp,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const backgroundColor =
        backgroundColorProp && isValidHexColor(backgroundColorProp)
          ? backgroundColorProp
          : undefined;
      const foregroundColor = foregroundColorProp
        ? isValidHexColor(foregroundColorProp)
          ? foregroundColorProp
          : undefined
        : backgroundColor
          ? getTextContrastColor(backgroundColor)
          : undefined;
      const isEmpty = !backgroundColor;
      const isInvalid = !!backgroundColorProp && !backgroundColor;

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
          invalid: isInvalid,
        },
      });

      return (
        <PaperBase
          {...getStyles('root', {
            style: assignInlineVars({
              [colorTagIndicatorTheme.tokens.container.color.normal]:
                backgroundColor,
              [colorTagIndicatorTheme.tokens.label.color]: foregroundColor,
              [colorTagIndicatorTheme.tokens.icon.color]: foregroundColor,
            }),
          })}
          ref={forwardedRef}
          {...other}
        >
          {icon ? (
            <div {...getStyles('icon')}>{icon}</div>
          ) : label ? (
            <div {...getStyles('label')}>{label}</div>
          ) : undefined}
          <div {...getStyles('crosshairs')} />
          {children}
        </PaperBase>
      );
    },
  );

ColorTagIndicator.theme = colorTagIndicatorTheme;
ColorTagIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
