import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagThemeFactory } from './ColorTag.css';
import type { IColorTagFactory } from './ColorTag.types';
import { getTextContrastColor } from '~/helpers/colors/getTextContrastColor';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { PaperBase } from '../PaperBase';
import { colorTagTheme } from './ColorTag.css';

const COMPONENT_NAME = 'ColorTag';

export const ColorTag = polymorphicComponentFactory<IColorTagFactory>(
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

    const { getStyles } = useComponentTheme<IColorTagThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorTagTheme,
      modifiers: {
        empty: isEmpty,
        invalid: isInvalid,
      },
    });

    return (
      <PaperBase
        {...getStyles('root', {
          style: assignInlineVars({
            [colorTagTheme.tokens.container.color.normal]: backgroundColor,
            [colorTagTheme.tokens.label.color]: foregroundColor,
            [colorTagTheme.tokens.icon.color]: foregroundColor,
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

ColorTag.theme = colorTagTheme;
ColorTag.displayName = `@sixui/${COMPONENT_NAME}`;
