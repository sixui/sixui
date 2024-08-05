import { forwardRef, useContext } from 'react';
import stylex from '@stylexjs/stylex';

import type { IColorPickerContentProps } from './ColorPickerContent.types';
import { useStyles } from '~/hooks/useStyles';
import { PaperBase } from '../PaperBase';
import { commonStyles } from '~/helpers/commonStyles';
import { Divider } from '../Divider';
import { ColorButton } from '../ColorButton';
import { ColorPaletteGroupContext } from '../ColorPaletteGroup';
import { colorPickerContentStyles } from './ColorPickerContent.styles';

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
      <div
        {...getStyles(
          commonStyles.verticalLayout,
          commonStyles.gap$xl,
          'section',
        )}
      >
        <div {...getStyles('grid')}>
          {palettes.map((palette, paletteIndex) => (
            <div
              key={paletteIndex}
              {...stylex.props(
                commonStyles.verticalLayout,
                commonStyles.gap$none,
              )}
            >
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
            </div>
          ))}
        </div>
      </div>

      {customColors?.length ? (
        <>
          <Divider />

          <div {...getStyles(commonStyles.horizontalLayout, 'section')}>
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
          </div>
        </>
      ) : undefined}
      {children}
    </PaperBase>
  );
});
