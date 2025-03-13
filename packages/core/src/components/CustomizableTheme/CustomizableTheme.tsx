import { useState } from 'react';

import type { IThemeOverride } from '~/components/Theme';
import type { ICustomizableThemeThemeFactory } from './CustomizableTheme.css';
import type { ICustomizableThemeFactory } from './CustomizableTheme.types';
import { ColorInput } from '~/components/ColorInput';
import { Flex } from '~/components/Flex';
import { TextInput } from '~/components/TextInput';
import { ThemeProvider, useComponentTheme, useProps } from '~/components/Theme';
import { generateThemeFromSourceColor } from '~/utils/colors/generateThemeFromSourceColor';
import { isValidHexColor } from '~/utils/colors/isValidHexColor';
import { componentFactory } from '~/utils/component/componentFactory';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './CustomizableTheme.constants';
import { customizableThemeTheme } from './CustomizableTheme.css';

export const CustomizableTheme = componentFactory<ICustomizableThemeFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ICustomizableThemeThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: customizableThemeTheme,
    });

    const [color, setColor] = useState('');
    const [scale, setScale] = useState('1');
    const [density, setDensity] = useState('0');
    const [minTargetSize, setMinTargetSize] = useState('48');

    const theme: IThemeOverride = {
      tokens: {
        colorScheme: isValidHexColor(color)
          ? generateThemeFromSourceColor(color)
          : {},
        scale,
        density: {
          scale: density,
          minTargetSize: px(minTargetSize),
        },
      },
    };

    return (
      <ThemeProvider theme={theme} inherit>
        <Flex
          {...getStyles('root')}
          direction="column"
          align="start"
          gap="$sm"
          {...other}
        >
          <Flex
            direction="row"
            gap="$xs"
            ref={forwardedRef}
            {...getStyles('controlBar')}
          >
            <ColorInput.Control
              w={px(224)}
              label="Color"
              onChange={setColor}
              clearable
            />
            <TextInput.Control
              w={px(96)}
              label="Scale"
              type="number"
              value={scale}
              min="0.5"
              step="0.1"
              onChange={(event) => {
                setScale(event.target.value);
              }}
              visibleFrom="medium"
            />
            <TextInput.Control
              w={px(96)}
              label="Density"
              type="number"
              value={density}
              step="1"
              onChange={(event) => {
                setDensity(event.target.value);
              }}
              visibleFrom="medium"
            />
            <TextInput.Control
              w={px(128)}
              label="Min. target size"
              type="number"
              value={minTargetSize}
              step="2"
              suffixText="px"
              onChange={(event) => {
                setMinTargetSize(event.target.value);
              }}
              disabled={Number(density) < 0}
              visibleFrom="medium"
            />
          </Flex>

          {children}
        </Flex>
      </ThemeProvider>
    );
  },
);

CustomizableTheme.displayName = `@sixui/core/${COMPONENT_NAME}`;
CustomizableTheme.theme = customizableThemeTheme;
