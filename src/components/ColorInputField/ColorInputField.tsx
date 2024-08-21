import { forwardRef, useContext, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IColorInputFieldColorPickerRendererProps,
  IColorInputFieldProps,
} from './ColorInputField.types';
import { useControlledValue } from '~/hooks/useControlledValue';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { useStyles } from '~/hooks/useStyles';
import { extractPaletteFromImage } from '~/helpers/colors/extractPaletteFromImage';
import { iconPhoto } from '~/assets/icons';
import { HslColorPickerContent } from '../HslColorPickerContent';
import { TextInputField } from '../TextInputField';
import { PopoverBase } from '../PopoverBase';
import { ColorTag } from '../ColorTag';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import { ColorPaletteGroupContext } from '../ColorPaletteGroup';
import { colorInputFieldStyles } from './ColorInputField.styles';

const defaultColorPickerRenderer = (
  props: IColorInputFieldColorPickerRendererProps,
): JSX.Element => <HslColorPickerContent {...props} />;

export const ColorInputField = forwardRef<
  HTMLInputElement,
  IColorInputFieldProps
>(function Field(props, forwardedRef) {
  const {
    styles,
    sx,
    placement = 'bottom-start',
    transitionOrientation = 'vertical',
    value: valueProp,
    defaultValue,
    inputRef: inputRefProp,
    colorPickerRenderer = defaultColorPickerRenderer,
    customColors: customColorsProp,
    onColorsQuantized,
    quantizeColorCount = 8,
    ...other
  } = props;

  const { combineStyles, globalStyles } = useStyles({
    name: 'ColorInputField',
    styles: [colorInputFieldStyles, styles],
  });

  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue ?? '',
    name: 'ColorInputField',
    onValueChange: (color) => other.onChange?.(color),
  });

  const [quantizedColors, setQuantizedColors] = useState<Array<string>>();
  const [isQuantizing, setIsQuantizing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHandleRef = useMergeRefs([inputRef, ...asArray(inputRefProp)]);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const colorPaletteGroupContext = useContext(ColorPaletteGroupContext);

  const handleUploadImage: React.MouseEventHandler = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const files = event.target.files;
    const file = files?.[0];
    if (!file) {
      return;
    }

    setIsQuantizing(true);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const image = new Image();
      image.src = fileReader.result as string;
      void extractPaletteFromImage(image, quantizeColorCount)
        .then((quantizedPalette) => {
          setQuantizedColors(quantizedPalette);
          setValue(quantizedPalette[0]);
          onColorsQuantized?.(quantizedPalette);
          colorPaletteGroupContext?.setQuantizedPalette(quantizedPalette);
        })
        .finally(() => setIsQuantizing(false));
    };
    fileReader.readAsDataURL(file);
  };

  const customColors = [
    ...(customColorsProp ?? []),
    ...((colorPaletteGroupContext ? undefined : quantizedColors) ?? []),
  ];

  return (
    <>
      <input
        type='file'
        ref={inputFileRef}
        accept='image/*'
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <PopoverBase
        contentRenderer={({ close }) =>
          colorPickerRenderer({
            onClick: (_, colorHex) => {
              setValue(colorHex);
              close();
            },
            selectedColor: value,
            customColors,
          })
        }
        placement={placement}
        transitionOrientation={transitionOrientation}
        openEvents={{ click: true }}
        trapFocus
      >
        {({ getProps, setRef }) => (
          <TextInputField
            start={
              <ColorTag
                backgroundColor={value}
                sx={combineStyles('colorTag')}
              />
            }
            end={
              <IconButton
                icon={<SvgIcon icon={iconPhoto} />}
                onClick={(event) => {
                  handleUploadImage(event);
                }}
                loading={isQuantizing}
              />
            }
            autoComplete='off'
            {...other}
            {...getProps()}
            sx={[globalStyles, combineStyles('host'), sx]}
            value={value}
            hasError={(!!value && !isValidHexColor(value)) || other.hasError}
            onChange={(event) => setValue(event.target.value)}
            ref={forwardedRef}
            inputRef={inputHandleRef}
            containerRef={setRef}
          />
        )}
      </PopoverBase>
    </>
  );
});
