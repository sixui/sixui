import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagThemeFactory } from './ColorTag.css';
import type { IColorTagFactory } from './ColorTag.types';
import { ButtonBase } from '~/components/ButtonBase';
import { Checkmark } from '~/components/Checkmark';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { getTextContrastColor } from '~/helpers/colors/getTextContrastColor';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ColorTagIndicator } from './ColorTagIndicator';
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
      color,
      outlined,
      selected,
      loading,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const isValid = !!color && isValidHexColor(color);
    const contrastColor = isValid ? getTextContrastColor(color) : undefined;

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

    return (
      <ButtonBase
        {...getStyles('root', {
          style: assignInlineVars({
            [colorTagTheme.tokens.foreground.color]: contrastColor,
          }),
        })}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
        })}
        ref={forwardedRef}
        {...other}
      >
        <ColorTagIndicator
          {...getStyles('indicator')}
          color={color}
          outlined={outlined}
        >
          {loading ? (
            <IndeterminateCircularProgressIndicator />
          ) : (
            <Checkmark {...getStyles('checkmark')} checked={selected} />
          )}
          {children}
        </ColorTagIndicator>
      </ButtonBase>
    );
  },
);

ColorTag.theme = colorTagTheme;
ColorTag.displayName = `@sixui/${COMPONENT_NAME}`;
ColorTag.Indicator = ColorTagIndicator;
