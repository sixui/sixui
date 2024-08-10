import { forwardRef, useContext } from 'react';

import type { IColorPickerContentProps } from './ColorPickerContent.types';
import { useStyles } from '~/hooks/useStyles';
import { PaperBase } from '../PaperBase';
import { Divider } from '../Divider';
import { ColorButton } from '../ColorButton';
import { ColorPaletteGroupContext } from '../ColorPaletteGroup';
import { colorPickerContentStyles } from './ColorPickerContent.styles';
import { Stack } from '../Stack';

export const ColorPickerContent = forwardRef<
  HTMLDivElement,
  IColorPickerContentProps
>(function ColorPickerContent(props, forwardedRef) {
  const {
    styles,
    sx,
    innerStyles,
    selectedColor,
    customColors: customColorsProp,
    onClick,
    palettes,
    children,
    ...other
  } = props;

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'ColorPickerContent',
    styles: [colorPickerContentStyles, styles],
  });

  const mergeColors = (colors: Array<string>): Array<string> =>
    [...new Set(colors)].slice(0, palettes.length);

  const colorPaletteGroupContext = useContext(ColorPaletteGroupContext);
  const customColors = mergeColors([
    ...(customColorsProp ?? []),
    ...(colorPaletteGroupContext?.customColors ?? []),
    ...(colorPaletteGroupContext?.quantizedPalette ?? []),
  ]);

  return (
    <PaperBase
      sx={[globalStyles, combineStyles('host'), sx]}
      styles={innerStyles?.paperBase}
      {...other}
      ref={forwardedRef}
    >
      <Stack gap={4} sx={combineStyles('section')}>
        <Stack horizontal gap={2} justify='space-between'>
          {palettes.map((palette, paletteIndex) => (
            <Stack key={paletteIndex}>
              <div {...getStyles('tones')}>
                {palette.map((color, colorIndex) => {
                  const isFirst = colorIndex === 0;
                  const isLast = colorIndex === palette.length - 1;

                  return (
                    <ColorButton
                      key={colorIndex}
                      backgroundColor={color}
                      sx={combineStyles(
                        'colorButton',
                        isFirst && 'colorButton$first',
                        isLast && 'colorButton$last',
                      )}
                      selected={
                        selectedColor ? color === selectedColor : undefined
                      }
                      onClick={
                        onClick
                          ? (event: React.MouseEvent<HTMLButtonElement>) =>
                              onClick(event, color)
                          : undefined
                      }
                    />
                  );
                })}
              </div>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {customColors?.length ? (
        <>
          <Divider />

          <Stack sx={combineStyles('section')} horizontal gap={2}>
            {customColors?.map((color, colorIndex) => (
              <ColorButton
                key={colorIndex}
                backgroundColor={color}
                selected={selectedColor ? color === selectedColor : undefined}
                onClick={
                  onClick
                    ? (event: React.MouseEvent<HTMLButtonElement>) =>
                        onClick(event, color)
                    : undefined
                }
              />
            ))}
          </Stack>
        </>
      ) : undefined}
      {children}
    </PaperBase>
  );
});
