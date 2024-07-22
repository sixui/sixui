import { forwardRef, useMemo, useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import {
  hexFromArgb,
  sourceColorFromImage,
} from '@material/material-color-utilities';
import { asArray } from '@olivierpascal/helpers';

import type {
  IColorInputFieldColorPickerRendererProps,
  IColorInputFieldProps,
} from './ColorInputField.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { TextInputField } from '@/components/TextInputField';
import { PopoverBase } from '@/components/PopoverBase';
import { useControlledValue } from '@/hooks/useControlledValue';
import { isValidHexColor } from '@/helpers/colors/isValidHexColor';
import { ColorTag } from '@/components/ColorTag';
import { HslColorPickerContent } from '@/components/HslColorPickerContent';
import { IconButton } from '@/components/IconButton';
import { SvgIcon } from '@/components/SvgIcon';
import { iconPhoto } from '@/assets/icons';
import { colorInputFieldStyles } from './ColorInputField.styles';

const defaultColorPickerRenderer = (
  props: IColorInputFieldColorPickerRendererProps,
): JSX.Element => <HslColorPickerContent {...props} />;

export const ColorInputField = forwardRef<
  HTMLInputElement,
  IColorInputFieldProps
>(function ColorInputField(props, forwardedRef) {
  const {
    styles,
    sx,
    placement = 'bottom-start',
    transitionOrientation = 'vertical',
    value: valueProp,
    defaultValue,
    inputRef: inputRefProp,
    colorPickerRenderer = defaultColorPickerRenderer,
    ...other
  } = props;

  const componentTheme = useComponentTheme('ColorInputField');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(colorInputFieldStyles, styles),
    [styles],
  );

  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue ?? '',
    name: 'ColorInputField',
    onValueChange: (color) => other.onChange?.(color),
  });

  const [isQuantizing, setIsQuantizing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHandleRef = useMergeRefs([inputRef, ...asArray(inputRefProp)]);
  const inputFileRef = useRef<HTMLInputElement>(null);

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
      void sourceColorFromImage(image)
        .then((sourceColor) => setValue(hexFromArgb(sourceColor)))
        .finally(() => setIsQuantizing(false));
    };
    fileReader.readAsDataURL(file);
  };

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
          })
        }
        placement={placement}
        transitionOrientation={transitionOrientation}
        openOnClick
        trapFocus
      >
        {({ getProps, setRef, close }) => (
          <TextInputField
            start={
              <ColorTag
                backgroundColor={value}
                sx={stylesCombinator('colorTag')}
              />
            }
            end={
              <IconButton
                icon={<SvgIcon icon={iconPhoto} />}
                onClick={(event) => {
                  handleUploadImage(event);
                  close();
                }}
                loading={isQuantizing}
              />
            }
            {...getProps(other)}
            sx={(componentTheme.overridenStyles, 'host', sx)}
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
