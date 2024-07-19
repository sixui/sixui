import { forwardRef, useMemo } from 'react';
import stylex from '@stylexjs/stylex';

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
import { areColorEquals } from '@/helpers/colors/areColorEquals';
import { colorToHex } from '@/helpers/colors/colorToHex';
import { basicTemplateStyles } from './TonalColorPickerContent.styles';

export const TonalColorPickerContent = forwardRef<
  HTMLDivElement,
  ITonalColorPickerContentProps
>(function TonalColorPickerContent(props, forwardedRef) {
  const {
    styles,
    sx,
    innerStyles,
    fixedColorScheme,
    sourceColor,
    selectedColor,
    customColors,
    onClick,
    palettesCount = 8,
    tones = [80, 50, 20],
    children,
    ...other
  } = props;

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

  const primaryToken = fixedColorScheme ? 'primaryFixed' : 'primary';
  const primaryColorsHex = getSchemeColorsHex(
    primaryToken,
    themeSchemes,
    sourceColor,
  );
  const primaryTonalPalettes = generateTonalPalettes(
    primaryColorsHex[colorScheme.variant],
    palettesCount,
  );

  return (
    <Paper
      sx={[componentTheme.overridenStyles, stylesCombinator('host'), sx]}
      elevation={2}
      styles={innerStyles?.paper}
      {...other}
      ref={forwardedRef}
    >
      <div
        {...sxf(commonStyles.verticalLayout, commonStyles.gap$xl, 'section')}
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
                {generateTones(palette, tones).map((tone, toneIndex) => {
                  const isFirst = toneIndex === 0;
                  const isLast = toneIndex === tones.length - 1;

                  return (
                    <ColorButton
                      key={toneIndex}
                      backgroundColor={tone.colorHex}
                      sx={[
                        stylesCombinator('colorButton'),
                        isFirst && stylesCombinator('colorButton$first'),
                        isLast && stylesCombinator('colorButton$last'),
                      ]}
                      selected={
                        selectedColor
                          ? areColorEquals(tone.colorHex, selectedColor)
                          : undefined
                      }
                      onClick={
                        onClick
                          ? (event: React.MouseEvent<HTMLButtonElement>) =>
                              onClick(event, tone.colorHex)
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {customColors ? (
        <>
          <Divider />

          <div {...sxf(commonStyles.horizontalLayout, 'section')}>
            {customColors?.map((color, colorIndex) => (
              <ColorButton
                key={colorIndex}
                backgroundColor={color}
                selected={
                  selectedColor
                    ? areColorEquals(color, selectedColor)
                    : undefined
                }
                onClick={
                  onClick
                    ? (event: React.MouseEvent<HTMLButtonElement>) =>
                        onClick(event, colorToHex(color))
                    : undefined
                }
              />
            ))}
          </div>
        </>
      ) : undefined}
      {children}
    </Paper>
  );
});
