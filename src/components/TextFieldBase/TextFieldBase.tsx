import { useCallback, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { ITextFieldBaseProps } from './TextFieldBase.types';
import { isFunction } from '~/helpers/isFunction';
import { useControlledValue } from '~/hooks/useControlledValue';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { useStyles } from '~/hooks/useStyles';
import { iconXMark } from '~/assets/icons';
import { FieldBase } from '../FieldBase';
import { Base } from '../Base';
import { useVisualState } from '../VisualState';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import {
  textFieldBaseFieldBaseStyles,
  textFieldBaseStyles,
} from './TextFieldBase.styles';
import { textFieldBaseTheme } from './TextFieldBase.stylex';

// https://github.com/material-components/material-web/blob/main/textfield/internal/text-field.ts

export const TextFieldBase = fixedForwardRef(function TextField<
  TElement extends HTMLElement = HTMLElement,
  TChildrenProps extends object = object,
>(
  props: ITextFieldBaseProps<TElement, TChildrenProps>,
  forwardedRef?: React.Ref<HTMLDivElement>,
) {
  const {
    styles,
    sx,
    visualState: visualStateProp,
    variant = 'filled',
    populated: populatedProp,
    value: valueProp,
    disabled: disabledProp,
    inputRenderer,
    onValueChange,
    innerStyles,
    clearable: clearableProp,
    clearIcon = <SvgIcon icon={iconXMark} />,
    inputRef: inputRefProp,
    onClear,
    defaultValue,
    ...other
  } = props;

  const inputRef = useRef<TElement>(null);
  const disabled = disabledProp || other.readOnly;
  const { visualState, setRef: setInputVisualStateRef } = useVisualState(
    visualStateProp,
    {
      disabled,
      retainFocusAfterClick: true,
    },
  );
  const inputHandleRef = useMergeRefs([
    inputRefProp,
    inputRef,
    setInputVisualStateRef,
  ]);

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'TextFieldBase',
    styles: [textFieldBaseStyles, styles],
  });

  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue ?? '',
    name: 'TextField',
  });

  const populated = populatedProp ?? !!value;
  const clearable = clearableProp && !disabled && populated;

  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const handleClearInput = useCallback(() => {
    if (value !== '') {
      setValue('');
      onClear?.();
      onValueChange?.('', inputRef.current);
    }
    inputRef.current?.focus();
  }, [setValue, value, onClear, onValueChange]);

  const handleValueChange = (
    value: string | number | ReadonlyArray<string>,
    target: TElement | null,
  ): void => {
    setValue(value);
    onValueChange?.(value, target);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <Base
      onClick={(event: React.MouseEvent) => {
        const isSelf = event.target === inputRef.current;
        if (!isSelf) {
          event.stopPropagation();
          inputRef.current?.click();
        }
      }}
      onFocus={(event: React.FocusEvent) => {
        const isSelf = event.nativeEvent.target === inputRef.current;
        const isTargetInteractive = [
          'BUTTON',
          'A',
          'INPUT',
          'SELECT',
          'TEXTAREA',
        ].includes(event.target.tagName);
        if (!isSelf && !isTargetInteractive) {
          event.stopPropagation();
          inputRef.current?.focus();
        }
      }}
      tabIndex={-1}
      role='button'
      sx={[textFieldBaseTheme, globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      <span {...getStyles('textField')}>
        <FieldBase
          styles={[
            textFieldBaseFieldBaseStyles,
            ...asArray(innerStyles?.fieldBase),
          ]}
          variant={variant}
          count={value?.toString().length}
          disabled={disabled}
          visualState={visualState}
          populated={populated}
          {...other}
          end={
            (other.end ?? clearable) ? (
              <>
                {clearable ? (
                  <IconButton
                    data-cy='clearButton'
                    ref={iconButtonRef}
                    icon={clearIcon}
                    onClick={handleClearInput}
                  />
                ) : undefined}
                {other.end}
              </>
            ) : undefined
          }
        >
          {isFunction(inputRenderer)
            ? ({ forwardedProps }) =>
                inputRenderer({
                  forwardedProps: {
                    'aria-invalid': other.hasError,
                    'aria-label': other.label,
                    value,
                    ...forwardedProps,
                  },
                  getStyles,
                  ref: inputHandleRef,
                  modifiers: {
                    hasError: other.hasError,
                    disabled,
                  },
                  onValueChange: handleValueChange,
                })
            : inputRenderer}
        </FieldBase>
      </span>
    </Base>
  );
});
