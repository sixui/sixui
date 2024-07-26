import { useCallback, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { ITextFieldBaseProps } from './TextFieldBase.types';
import { isFunction } from '~/helpers/isFunction';
import { FieldBase } from '~/components/FieldBase';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { useVisualState } from '~/components/VisualState';
import { useControlledValue } from '~/hooks/useControlledValue';
import { IconButton } from '~/components/IconButton';
import { fixedForwardRef } from '~/helpers/fixedForwardRef';
import { SvgIcon } from '~/components/SvgIcon';
import { iconXMark } from '~/assets/icons';
import {
  textFieldBaseFieldStyles,
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

  const componentTheme = useComponentTheme('TextFieldBase');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(textFieldBaseStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

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
    <div
      {...sxf(textFieldBaseTheme, componentTheme.overridenStyles, 'host', sx)}
      onClick={(event) => {
        const isSelf = event.target === inputRef.current;
        if (!isSelf) {
          event.stopPropagation();
          inputRef.current?.click();
        }
      }}
      onFocus={(event) => {
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
      ref={forwardedRef}
    >
      <span {...sxf('textField')}>
        <FieldBase
          styles={[textFieldBaseFieldStyles, ...asArray(innerStyles?.field)]}
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
                  sxf,
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
    </div>
  );
});
