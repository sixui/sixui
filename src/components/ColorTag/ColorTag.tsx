import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IColorTagThemeFactory } from './ColorTag.css';
import type { IColorTagFactory } from './ColorTag.types';
import { iconCheckMark } from '~/assets/icons';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
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
      backgroundColor,
      foregroundColor,
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
    });

    return (
      <ButtonBase
        {...getStyles('root', {
          style: assignInlineVars({
            [colorTagTheme.tokens.container.color]: backgroundColor,
          }),
        })}
        classNames={mergeClassNames(classNames, {
          background: getStyles('background').className,
        })}
        ref={forwardedRef}
        {...other}
      >
        <ColorTagIndicator
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          label={children}
          icon={selected && <SvgIcon icon={iconCheckMark} />}
        />
      </ButtonBase>
    );
  },
);

ColorTag.theme = colorTagTheme;
ColorTag.displayName = `@sixui/${COMPONENT_NAME}`;
ColorTag.Indicator = ColorTagIndicator;
