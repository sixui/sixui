import type { IColorPickerContentThemeFactory } from './ColorPickerContent.css';
import type {
  IColorPalette,
  IColorPickerContentFactory,
} from './ColorPickerContent.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ColorTag } from '../ColorTag';
import { Divider } from '../Divider';
import { Flex } from '../Flex';
import { PaperBase } from '../PaperBase';
import { colorPickerContentTheme } from './ColorPickerContent.css';

const COMPONENT_NAME = 'ColorPickerContent';

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
              ? (event: React.MouseEvent<Element>) => onClick(event, color)
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
ColorPickerContent.displayName = `@sixui/${COMPONENT_NAME}`;
