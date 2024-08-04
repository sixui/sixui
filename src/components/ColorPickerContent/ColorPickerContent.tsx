import { forwardRef, useContext, useMemo } from 'react';
import stylex from '@stylexjs/stylex';

import type { IColorPickerContentProps } from './ColorPickerContent.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { PaperBase } from '../PaperBase';
import { commonStyles } from '~/helpers/commonStyles';
import { Divider } from '../Divider';
import { ColorButton } from '../ColorButton';
import { ColorPaletteGroupContext } from '../ColorPaletteGroup';
import { basicTemplateStyles } from './ColorPickerContent.styles';

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

  const componentTheme = useComponentTheme('ColorPickerContent');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(basicTemplateStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

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
      sx={[componentTheme.overridenStyles, stylesCombinator('host'), sx]}
      styles={innerStyles?.paperBase}
      {...other}
      ref={forwardedRef}
    >
      <div
        {...sxf(commonStyles.verticalLayout, commonStyles.gap$xl, 'section')}
      >
        <div {...sxf('grid')}>
          {palettes.map((palette, paletteIndex) => (
            <div
              key={paletteIndex}
              {...stylex.props(
                commonStyles.verticalLayout,
                commonStyles.gap$none,
              )}
            >
              <div {...sxf('tones')}>
                {palette.map((color, colorIndex) => {
                  const isFirst = colorIndex === 0;
                  const isLast = colorIndex === palette.length - 1;

                  return (
                    <ColorButton
                      key={colorIndex}
                      backgroundColor={color}
                      sx={[
                        stylesCombinator('colorButton'),
                        isFirst && stylesCombinator('colorButton$first'),
                        isLast && stylesCombinator('colorButton$last'),
                      ]}
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

          <div {...sxf(commonStyles.horizontalLayout, 'section')}>
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
