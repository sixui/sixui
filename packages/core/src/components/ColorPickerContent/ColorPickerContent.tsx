import type { IColorPalette } from '~/utils/types';
import type { IColorPickerContentThemeFactory } from './ColorPickerContent.css';
import type { IColorPickerContentFactory } from './ColorPickerContent.types';
import { ColorTag } from '~/components/ColorTag';
import { Divider } from '~/components/Divider';
import { Flex } from '~/components/Flex';
import { PaperBase } from '~/components/PaperBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorPickerContent.constants';
import { colorPickerContentTheme } from './ColorPickerContent.css';

export const ColorPickerContent = componentFactory<IColorPickerContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      disabled,
      selectedColor,
      onClick,
      customPalette,
      palettes,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IColorPickerContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: colorPickerContentTheme,
      modifiers: {
        disabled,
      },
    });

    const renderPalette = (palette: IColorPalette): React.ReactNode =>
      palette.map((color, colorIndex) => (
        <ColorTag
          key={colorIndex}
          color={color}
          selected={selectedColor ? color === selectedColor : undefined}
          onClick={
            onClick
              ? (event: React.MouseEvent) => onClick(event, color)
              : undefined
          }
        />
      ));

    return (
      <PaperBase {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('section')}>
          <Flex direction="row" gap="$2" justify="space-between">
            {palettes.map((palette, paletteIndex) => (
              <Flex key={paletteIndex} direction="column" gap="$2">
                {renderPalette(palette)}
              </Flex>
            ))}
          </Flex>
        </div>

        {customPalette?.length ? (
          <>
            <Divider />
            <div {...getStyles('section')}>
              <Flex direction="row" gap="$2">
                {renderPalette(customPalette)}
              </Flex>
            </div>
          </>
        ) : undefined}

        {children}
      </PaperBase>
    );
  },
);

ColorPickerContent.theme = colorPickerContentTheme;
ColorPickerContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
