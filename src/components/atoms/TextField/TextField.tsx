import { useCallback, useMemo, useRef } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { isFunction } from 'lodash';
import { useMergeRefs } from '@floating-ui/react';

import type { ITextFieldProps } from './TextFieldProps';
import type { IThemeComponents } from '@/components/utils/Theme';
import type { ITextFieldStyleKey } from './TextField.styledefs';
import {
  FieldBase,
  type IFieldBaseStyleVarKey,
  type IFieldBaseVariant,
} from '../FieldBase';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { useControlledValue } from '@/hooks/useControlledValue';
import { IconButton } from '@/components/atoms/IconButton';
import { ReactComponent as XMarkIcon } from '@/assets/XMark.svg';
import { fixedForwardRef } from '@/helpers/fixedForwardRef';

// https://github.com/material-components/material-web/blob/main/textfield/internal/text-field.ts

type ITextFieldVariantMap = {
  [key in IFieldBaseVariant]: keyof Pick<
    IThemeComponents,
    'FilledTextField' | 'OutlinedTextField'
  >;
};

const variantMap: ITextFieldVariantMap = {
  filled: 'FilledTextField',
  outlined: 'OutlinedTextField',
};

export const TextField = fixedForwardRef(function TextField<
  TElement extends HTMLElement = HTMLElement,
  TChildrenProps extends object = object,
>(
  props: ITextFieldProps<TElement, TChildrenProps>,
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
    children,
    onValueChange,
    innerStyles,
    clearable: clearableProp,
    clearIcon = <XMarkIcon aria-hidden />,
    inputRef: inputRefProp,
    onClear,
    ...other
  } = props;

  const inputRef = useRef<TElement>(null);
  const disabled = disabledProp || other.readOnly;
  const { visualState, ref: inputVisualStateRef } = useVisualState<TElement>(
    visualStateProp,
    {
      disabled,
      retainFocusAfterClick: true,
    },
  );
  const handleRef = useMergeRefs([inputRefProp, inputRef, inputVisualStateRef]);

  const { theme, variantTheme } = useComponentTheme(
    'TextField',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ITextFieldStyleKey, IFieldBaseStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: other.defaultValue,
    name: 'TextField',
  });

  const populated = populatedProp ?? !!value;
  const clearable = clearableProp && !disabled && populated;

  const iconButtonRef = useRef<HTMLButtonElement>(null);
  const handleClearInput = useCallback(() => {
    if (value !== '') {
      inputRef.current?.focus();
      setValue('');
      onClear?.();
      onValueChange?.('', inputRef.current);
    }
    inputRef.current?.focus();
  }, [setValue, value, onClear, onValueChange]);

  const handleValueChange = (value: string, target: TElement | null): void => {
    setValue(value);
    onValueChange?.(value, target);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      {...sxf('host', theme.vars, variantTheme?.vars, sx)}
      onClick={(event) => {
        const isSelf = event.target === inputRef.current;
        if (!isSelf) {
          event.stopPropagation();
          inputRef.current?.click();
          inputRef.current?.focus();
        }
      }}
      tabIndex={-1}
      ref={forwardedRef}
    >
      <span {...sxf('textField')}>
        <FieldBase
          styles={[
            theme.fieldStyles,
            variantTheme?.fieldStyles,
            ...asArray(innerStyles?.field),
          ]}
          variant={variant}
          count={value?.toString().length}
          disabled={disabled}
          visualState={visualState}
          populated={populated}
          {...other}
          end={
            other.end ?? clearable ? (
              <>
                {other.end}
                {clearable ? (
                  <IconButton
                    data-cy='clearButton'
                    ref={iconButtonRef}
                    icon={clearIcon}
                    onClick={handleClearInput}
                  />
                ) : undefined}
              </>
            ) : undefined
          }
        >
          {isFunction(children)
            ? ({ forwardedHtmlProps: forwardedRestProps }) =>
                children({
                  forwardedHtmlProps: {
                    'aria-invalid': other.hasError,
                    'aria-label': other.label,
                    ...forwardedRestProps,
                  },
                  sxf,
                  ref: handleRef,
                  modifiers: {
                    hasError: other.hasError,
                    disabled,
                  },
                  onValueChange: handleValueChange,
                })
            : children}
        </FieldBase>
      </span>
    </div>
  );
});
