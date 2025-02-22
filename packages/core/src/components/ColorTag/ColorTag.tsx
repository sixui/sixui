import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagThemeFactory } from './ColorTag.css';
import type { IColorTagFactory } from './ColorTag.types';
import { ButtonBase } from '~/components/ButtonBase';
import { Checkmark } from '~/components/Checkmark';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { useComponentTheme, useProps } from '~/components/Theme';
import { getTextContrastColor } from '~/utils/colors/getTextContrastColor';
import { isValidHexColor } from '~/utils/colors/isValidHexColor';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { COMPONENT_NAME } from './ColorTag.constants';
import { ColorTagIndicator } from './ColorTagIndicator';
import { colorTagTheme } from './ColorTag.css';

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
      disabled,
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
        disabled,
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
        disabled={disabled}
        ref={forwardedRef}
        {...other}
      >
        {({ renderFocusRing, renderStateLayer, renderTouchTarget }) => (
          <>
            {renderFocusRing()}

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

            {renderStateLayer()}
            {renderTouchTarget()}
          </>
        )}
      </ButtonBase>
    );
  },
);

ColorTag.theme = colorTagTheme;
ColorTag.displayName = `@sixui/core/${COMPONENT_NAME}`;
ColorTag.Indicator = ColorTagIndicator;
