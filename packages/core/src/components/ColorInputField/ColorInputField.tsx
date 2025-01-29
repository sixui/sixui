import { useCallback, useContext, useRef, useState } from 'react';

import type { IColorPalette } from '~/components/ColorPickerContent';
import type {
  IColorInputFieldColorPickerRendererProps,
  IColorInputFieldFactory,
} from './ColorInputField.types';
import { iconPhoto } from '~/assets/icons';
import { ColorPaletteGroupContext } from '~/components/ColorPaletteGroup';
import { ColorTag } from '~/components/ColorTag';
import { HslColorPickerContent } from '~/components/HslColorPickerContent';
import { IconButton } from '~/components/IconButton';
import { PopoverBase } from '~/components/PopoverBase';
import { SvgIcon } from '~/components/SvgIcon';
import { TextInputField } from '~/components/TextInputField';
import { extractPaletteFromImage } from '~/helpers/colors/extractPaletteFromImage';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { useControlledValue } from '~/hooks/useControlledValue';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { colorInputFieldTheme } from './ColorInputField.css';

const COMPONENT_NAME = 'ColorInputField';

const defaultColorPickerRenderer = (
  props: IColorInputFieldColorPickerRendererProps,
): React.JSX.Element => <HslColorPickerContent {...props} />;

export const ColorInputField = componentFactory<IColorInputFieldFactory>(
  (props, forwardedRef) => {
    const {
      placement = {
        side: 'bottom',
        alignment: 'start',
      },
      colorPickerRenderer = defaultColorPickerRenderer,
      customPalette: customPaletteProp,
      onColorsQuantized,
      quantizeColorCount = 8,
      value: valueProp,
      defaultValue,
      onChange,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [value, setValue] = useControlledValue({
      controlled: valueProp,
      default: defaultValue ?? '',
      name: COMPONENT_NAME,
    });

    const colorPaletteGroupContext = useContext(ColorPaletteGroupContext);
    const [quantizedPalette, setQuantizedPalette] = useState<IColorPalette>();
    const [quantizing, setQuantizing] = useState(false);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const isValidColor = isValidHexColor(value);
    const customPalette = [
      ...(customPaletteProp ?? []),
      ...(colorPaletteGroupContext?.customPalette ?? []),
      ...(colorPaletteGroupContext?.quantizedPalette ?? quantizedPalette ?? []),
    ];

    const handleUploadImage: React.MouseEventHandler = useCallback(
      () => inputFileRef.current?.click(),
      [],
    );

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          const files = event.target.files;
          const file = files?.[0];
          if (!file) {
            return;
          }

          setQuantizing(true);

          const fileReader = new FileReader();
          fileReader.onload = () => {
            const image = new Image();
            image.src = fileReader.result as string;
            void extractPaletteFromImage(image, quantizeColorCount)
              .then((quantizedPalette) => {
                setQuantizedPalette(quantizedPalette);
                setValue(quantizedPalette[0] ?? '');
                onColorsQuantized?.(quantizedPalette);
                colorPaletteGroupContext?.setQuantizedPalette(quantizedPalette);
              })
              .finally(() => {
                setQuantizing(false);
              });
          };
          fileReader.readAsDataURL(file);
        },
        [
          colorPaletteGroupContext,
          onColorsQuantized,
          quantizeColorCount,
          setValue,
        ],
      );

    return (
      <>
        <input
          type="file"
          ref={inputFileRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <PopoverBase
          contentRenderer={({ close }) =>
            colorPickerRenderer({
              onClick: (_event, colorHex) => {
                setValue(colorHex);
                onChange?.(colorHex, true);
                close();
              },
              selectedColor: value,
              customPalette,
            })
          }
          middlewares={{
            offset: false,
          }}
          trapFocus
          placement={placement}
          floatingMotionProps={{
            orientation: 'vertical',
          }}
          positioned
        >
          {({ getProps, setRef, open }) => (
            <TextInputField
              startSlot={
                <ColorTag color={value} outlined mr="$2" onClick={open} />
              }
              endSlot={
                <IconButton
                  icon={<SvgIcon icon={iconPhoto} />}
                  onClick={handleUploadImage}
                  loading={quantizing}
                />
              }
              autoComplete="off"
              {...other}
              {...getProps()}
              value={value}
              hasError={(!!value && !isValidColor) || other.hasError}
              onChange={(nextValue) => {
                setValue(nextValue);
                onChange?.(nextValue, isValidHexColor(nextValue));
              }}
              ref={forwardedRef}
              containerRef={setRef}
            />
          )}
        </PopoverBase>
      </>
    );
  },
);

ColorInputField.theme = colorInputFieldTheme;
ColorInputField.displayName = `@sixui/${COMPONENT_NAME}`;
