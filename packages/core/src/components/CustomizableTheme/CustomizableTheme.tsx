import { useState } from 'react';

import type { IThemeOverride } from '~/components/Theme';
import type { ICustomizableThemeThemeFactory } from './CustomizableTheme.css';
import type { ICustomizableThemeFactory } from './CustomizableTheme.types';
import { ColorInputField } from '~/components/ColorInputField';
import { Flex } from '~/components/Flex';
import { Paper } from '~/components/Paper';
import { TextInputField } from '~/components/TextInputField';
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
      disabled,
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
      modifiers: {
        disabled,
      },
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
        <Paper
          as={Flex}
          direction="column"
          align="start"
          gap="$2"
          {...getStyles('root')}
          {...other}
        >
          <Flex
            direction="row"
            gap="$1"
            ref={forwardedRef}
            {...getStyles('controlBar')}
          >
            <ColorInputField
              w="$56"
              label="Color"
              onChange={setColor}
              clearable
            />
            <TextInputField
              w="$24"
              label="Scale"
              type="number"
              value={scale}
              min="0.5"
              step="0.1"
              onChange={(event) => {
                setScale(event.target.value);
              }}
            />
            <TextInputField
              w="$24"
              label="Density"
              type="number"
              value={density}
              step="1"
              onChange={(event) => {
                setDensity(event.target.value);
              }}
            />
            <TextInputField
              w="$32"
              label="Min. target size"
              type="number"
              value={minTargetSize}
              step="2"
              suffixText="px"
              onChange={(event) => {
                setMinTargetSize(event.target.value);
              }}
              disabled={Number(density) < 0}
            />
          </Flex>

          {children}
        </Paper>
      </ThemeProvider>
    );
  },
);

CustomizableTheme.displayName = `@sixui/core/${COMPONENT_NAME}`;
