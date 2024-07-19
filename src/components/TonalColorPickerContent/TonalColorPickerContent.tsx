import { forwardRef, useMemo } from 'react';
import stylex from '@stylexjs/stylex';
import {
  argbFromHex,
  Hct,
  hexFromArgb,
} from '@material/material-color-utilities';

import type { ITonalColorPickerContentProps } from './TonalColorPickerContent.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Paper } from '@/components/Paper';
import baseTheme from '@/themes/base/theme.json';
import { useThemeContext } from '@/components/Theme';
import { useColorScheme } from '@/components/ColorScheme';
import { commonStyles } from '@/helpers/commonStyles';
import { Divider } from '@/components/Divider';
import { generateTonalPalettes } from '@/helpers/colors/generateTonalPalettes';
import { generateTones } from '@/helpers/colors/generateTones';
import { ColorButton } from '@/components/ColorButton';
import { getSchemeColorsHex } from '@/helpers/colors/getSchemeColorsHex';
import { getForegroundLuminance } from '@/helpers/colors/getForegroundLuminance';
import { basicTemplateStyles } from './TonalColorPickerContent.styles';

export const TonalColorPickerContent = forwardRef<
  HTMLDivElement,
  ITonalColorPickerContentProps
>(function TonalColorPickerContent(props, forwardedRef) {
  const { styles, sx, fixedColorScheme, primaryColor, ...other } = props;

  const componentTheme = useComponentTheme('TonalColorPickerContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(basicTemplateStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const colorScheme = useColorScheme();
  const themeContext = useThemeContext();

  const themeSchemes = themeContext.theme?.schemes ?? baseTheme.schemes;

  const paletteSize = 8;

  const primaryToken = fixedColorScheme ? 'primaryFixed' : 'primary';
  const primaryColorsHex = getSchemeColorsHex(
    primaryToken,
    themeSchemes,
    primaryColor,
  );
  const primaryColorHex = primaryColorsHex[colorScheme.variant];
  const primaryColorHct = Hct.fromInt(argbFromHex(primaryColorHex));
  const primaryTonalPalettes = generateTonalPalettes(
    primaryColorHct,
    paletteSize,
  );

  const luminances = [80, 50, 30];

  return (
    <div
      {...sxf(componentTheme.overridenStyles, 'host', sx)}
      {...other}
      ref={forwardedRef}
    >
      <Paper elevation={5}>
        <div
          {...sxf(commonStyles.verticalLayout, commonStyles.gap$xl, 'inner')}
        >
          <div {...sxf('grid')}>
            {primaryTonalPalettes.map((palette, paletteIndex) => (
              <div
                key={paletteIndex}
                {...stylex.props(
                  commonStyles.verticalLayout,
                  commonStyles.gap$none,
                )}
              >
                <div {...sxf('tones')}>
                  {generateTones(palette, luminances).map((tone, toneIndex) => {
                    const isFirst = toneIndex === 0;
                    const isLast = toneIndex === luminances.length - 1;

                    return (
                      <ColorButton
                        key={toneIndex}
                        backgroundColor={tone.colorHex}
                        foregroundColor={hexFromArgb(
                          palette.tone(getForegroundLuminance(tone.luminance)),
                        )}
                        sx={[
                          stylesCombinator('colorButton'),
                          isFirst && stylesCombinator('colorButton$first'),
                          isLast && stylesCombinator('colorButton$last'),
                        ]}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Divider />

          <div {...sxf('grid')}>Custom colors</div>
        </div>
      </Paper>
    </div>
  );
});
