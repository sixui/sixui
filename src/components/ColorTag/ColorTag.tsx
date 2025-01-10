import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagThemeFactory } from './ColorTag.css';
import type { IColorTagFactory } from './ColorTag.types';
import { iconCheckMark } from '~/assets/icons';
import { getTextContrastColor } from '~/helpers/colors/getTextContrastColor';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Button } from '../Button';
import { ColorTagIndicator } from '../ColorTagIndicator';
import { SvgIcon } from '../SvgIcon';
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
      selected,
      children,
      backgroundColor: backgroundColorProp,
      foregroundColor: foregroundColorProp,
      outlined,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IColorTagThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorTagTheme,
      modifiers: {
        outlined,
      },
    });

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

    return (
      <Button
        {...getStyles('root', {
          style: assignInlineVars({
            [colorTagTheme.tokens.foreground.color]: foregroundColor,
          }),
        })}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
        })}
        ref={forwardedRef}
        as={ColorTagIndicator}
        label={children}
        color={backgroundColorProp}
        icon={selected && <SvgIcon icon={iconCheckMark} />}
        {...other}
      />
    );
  },
);

ColorTag.theme = colorTagTheme;
ColorTag.displayName = `@sixui/${COMPONENT_NAME}`;
ColorTag.Indicator = ColorTagIndicator;
