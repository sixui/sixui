import { forwardRef, useMemo, useRef } from 'react';

import type { IColorInputFieldProps } from './ColorInputField.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { TextInputField } from '@/components/TextInputField';
import { PopoverBase } from '@/components/PopoverBase';
import { TonalColorPickerContent } from '@/components/TonalColorPickerContent';
import { useControlledValue } from '@/hooks/useControlledValue';
import { isValidHexColor } from '@/helpers/colors/isValidHexColor';
import { ColorTag } from '@/components/ColorTag';
import { colorInputFieldStyles } from './ColorInputField.styles';
import { useMergeRefs } from '@floating-ui/react';

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
      contentRenderer={({ close }) => (
        <TonalColorPickerContent
          onClick={(_, colorHex) => {
            setValue(colorHex);
            if (inputRef.current) {
              inputRef.current.value = colorHex;
            }
            other.onChange?.({
              target: inputRef.current,
            } as React.ChangeEvent<HTMLInputElement>);
            close();
          }}
        />
      )}
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
