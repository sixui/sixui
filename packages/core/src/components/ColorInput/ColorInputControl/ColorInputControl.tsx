import { useCallback, useRef, useState } from 'react';

import type { IColorPalette } from '~/utils/types';
import type {
  IColorInputControlColorPickerRendererProps,
  IColorInputControlFactory,
} from './ColorInputControl.types';
import { iconPhoto } from '~/assets/icons';
import { useColorPaletteGroupContext } from '~/components/ColorPaletteGroup/ColorPaletteGroup.context';
import { ColorTag } from '~/components/ColorTag';
import { HslColorPickerContent } from '~/components/HslColorPickerContent';
import { IconButton } from '~/components/IconButton';
import { PopoverBase } from '~/components/PopoverBase';
import { SvgIcon } from '~/components/SvgIcon';
import { TextInputControl } from '~/components/TextInput';
import { useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { extractPaletteFromImage } from '~/utils/colors/extractPaletteFromImage';
import { isValidHexColor } from '~/utils/colors/isValidHexColor';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorInputControl.constants';
import { colorInputControlTheme } from './ColorInputControl.css';

const defaultColorPickerRenderer = (
  props: IColorInputControlColorPickerRendererProps,
): React.JSX.Element => <HslColorPickerContent {...props} />;

export const ColorInputControl = componentFactory<IColorInputControlFactory>(
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

    const colorPaletteGroupContext = useColorPaletteGroupContext();
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
          modal
          positioned
        >
          {({ getProps, setRef, open }) => (
            <TextInputControl
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
              onChange={(event) => {
                const nextValue = event.target.value;
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

ColorInputControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
ColorInputControl.theme = colorInputControlTheme;
