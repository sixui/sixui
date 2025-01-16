import { useState } from 'react';

import type { IThemeOverride } from '../ThemeProvider';
import type { ICustomizableThemeThemeFactory } from './CustomizableTheme.css';
import type { ICustomizableThemeFactory } from './CustomizableTheme.types';
import { generateThemeFromSourceColor } from '~/helpers/colors/generateThemeFromSourceColor';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ColorInputField } from '../ColorInputField';
import { Flex } from '../Flex';
import { Paper } from '../Paper';
import { TextInputField } from '../TextInputField';
import { ThemeProvider } from '../ThemeProvider';
import { customizableThemeTheme } from './CustomizableTheme.css';

const COMPONENT_NAME = 'CustomizableTheme';

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
          minTargetSize,
        },
      },
    };

    return (
      <ThemeProvider theme={theme}>
        <Paper
          as={Flex}
          direction="column"
          align="start"
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
              onChange={setScale}
            />
            <TextInputField
              w="$24"
              label="Density"
              type="number"
              value={density}
              step="1"
              onChange={setDensity}
            />
            <TextInputField
              w="$32"
              label="Min. target size"
              type="number"
              value={minTargetSize}
              step="2"
              suffixText="px"
              onChange={setMinTargetSize}
              disabled={Number(density) < 0}
            />
          </Flex>

          {children}
        </Paper>
      </ThemeProvider>
    );
  },
);

CustomizableTheme.displayName = `@sixui/${COMPONENT_NAME}`;
