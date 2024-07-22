import { forwardRef, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

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
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const inputHandleRef = useMergeRefs([inputRef, inputRefProp]);

  return (
    <PopoverBase
      contentRenderer={({ close }) =>
        colorPickerRenderer({
          onClick: (_, colorHex) => {
            setValue(colorHex);
            // Only call the `onChange` callback after the value has been set
            // in the next tick.
            setTimeout(() => {
              other.onChange?.({
                target: inputRef.current,
              } as React.ChangeEvent<HTMLInputElement>);
            });
            close();
          },
          selectedColor: value,
        })
      }
      openOnClick
      openOnFocus
      placement={placement}
    >
      <TextInputField
        {...other}
        sx={(componentTheme.overridenStyles, 'host', sx)}
        start={
          other.start ?? (
            <ColorTag
              backgroundColor={value}
              sx={stylesCombinator('colorTag')}
            />
          )
        }
        value={value}
        hasError={(!!value && !isValidHexColor(value)) || other.hasError}
        onChange={(event) => {
          other.onChange?.(event);
          setValue(event.target.value);
        }}
        ref={forwardedRef}
        inputRef={inputHandleRef}
      />
    </PopoverBase>
  );
});
