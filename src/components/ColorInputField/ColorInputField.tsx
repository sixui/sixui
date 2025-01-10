import type {
  IColorInputFieldColorPickerRendererProps,
  IColorInputFieldFactory,
} from './ColorInputField.types';
import { isValidHexColor } from '~/helpers/colors/isValidHexColor';
import { useControlledValue } from '~/hooks/useControlledValue';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { ColorTag } from '../ColorTag';
import { HslColorPickerContent } from '../HslColorPickerContent';
import { PopoverBase } from '../PopoverBase';
import { TextInputField } from '../TextInputField';
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
      customPalette,
      onColorsQuantized,
      quantizeColorCount,
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

    const isValidColor = isValidHexColor(value);

    return (
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
        trapFocus
        placement={placement}
        floatingMotionProps={{
          orientation: 'vertical',
        }}
        positioned
      >
        {({ getProps, setRef, open }) => (
          <TextInputField
            start={<ColorTag color={value} outlined mr="$2" onClick={open} />}
            // FIXME:
            end={
              undefined
              // <IconButton
              //   icon={<SvgIcon icon={iconPhoto} />}
              //   onClick={(event) => {
              //     handleUploadImage(event);
              //   }}
              //   loading={isQuantizing}
              // />
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
    );
  },
);

ColorInputField.theme = colorInputFieldTheme;
ColorInputField.displayName = `@sixui/${COMPONENT_NAME}`;
