import { useRef, useState } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { ITextInputFieldFactory } from './TextInputField.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { iconEye, iconEyeSlash } from '~/assets/icons';
import { IconButton } from '../IconButton';
import { SvgIcon } from '../SvgIcon';
import {
  textInputFieldTheme,
  type ITextInputFieldThemeFactory,
} from './TextInputField.css';
import { FieldBase } from '../FieldBase';
import { ButtonBase } from '../ButtonBase';
import { useStateLayer } from '../StateLayer';
import {
  useFocus,
  useFocusRing,
  useFocusVisible,
  useHover,
  usePress,
} from 'react-aria';
import { Box } from '../Box';

const COMPONENT_NAME = 'TextInputField';

export const TextInputField = componentFactory<ITextInputFieldFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      type = 'text',
      noSpinner,
      unmaskable: unmaskableProp = true,
      maskIcon = <SvgIcon icon={iconEyeSlash} />,
      unmaskIcon = <SvgIcon icon={iconEye} />,
      inputRef: inputRefProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ITextInputFieldThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: textInputFieldTheme,
      variant,
    });

    const unmaskable = type === 'password' && unmaskableProp;
    const [unmasked, setUnmasked] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const inputHandleRef = useMergeRefs([inputRef, inputRefProp]);

    const stateLayer = useStateLayer<HTMLDivElement>({
      // interactions,
      // disabled,
      pressEvents: {
        onPress: (event) => {
          console.log('___', event.target);
          const isSelf = event.target === inputRef.current;
          console.log('__isSelf', isSelf);
          if (isSelf) {
            event.continuePropagation();
          } else {
            inputRef.current?.focus();
          }
        },
      },
      // focusWithin: true,
    });

    // const inputRenderer: ITextFieldBaseProps<HTMLInputElement>['inputRenderer'] =
    //   ({ getStyles, ref, forwardedProps, modifiers, onValueChange }) => (
    // <input
    //   {...getStyles(
    //     'input',
    //     modifiers.hasError && 'input$error',
    //     modifiers.disabled && 'input$disabled',
    //     noSpinner && 'input$noSpinner',
    //     type === 'number' && 'input$number',
    //   )}
    //   type={type === 'password' ? (unmasked ? 'text' : 'password') : type}
    //   disabled={modifiers.disabled}
    //   {...forwardedProps}
    //   onChange={(event) => {
    //     forwardedProps?.onChange?.(event);
    //     onValueChange?.(event.target.value, event.target);
    //   }}
    //   ref={ref}
    // />
    //   );

    const inputPress = usePress({
      onPress: (event) => {
        console.log('_input press');
        event.continuePropagation();
      },
      allowTextSelectionOnPress: true,
    });

    const [inputFocused, setInputFocused] = useState(false);

    const wrapperPress = usePress({
      onPress: () => {
        inputRef.current?.focus();
      },
    });

    const hover = useHover({
      // onHoverStart: (event) => {
      //   console.log('__hover start');
      // },
    });

    const focus = useFocusRing({
      // onFocusChange: (focused) => {
      //   console.log('input focused:', focused);
      //   setInputFocused(focused);
      // },
      isTextInput: true,
    });

    const handleClear = (): void => {
      if (inputRef.current?.value) {
        inputRef.current.value = '';
      }
      other.onChange?.({
        target: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
      <FieldBase
        {...other}
        {...getStyles('root')}
        {...hover.hoverProps}
        classNames={classNames}
        ref={forwardedRef}
        onClick={() => inputRef.current?.focus()}
        interactions={{
          focused: focus.isFocused,
          hovered: hover.isHovered,
        }}
        variant={variant}
        end={
          (other.end ?? unmaskable) ? (
            <>
              {other.end}
              {unmaskable ? (
                <IconButton
                  onPress={() => setUnmasked((unmasked) => !unmasked)}
                  icon={unmaskIcon}
                  selectedIcon={maskIcon}
                  selected={unmasked}
                  toggle
                />
              ) : undefined}
            </>
          ) : undefined
        }
        // inputRef={inputHandleRef}
        // onClear={handleClear}
        forwardProps
        // inputRenderer={inputRenderer}
      >
        <input
          {...getStyles(
            'input',
            // modifiers.hasError && 'input$error',
            // modifiers.disabled && 'input$disabled',
            // noSpinner && 'input$noSpinner',
            // type === 'number' && 'input$number',
          )}
          {...focus.focusProps}
          type={type === 'password' ? (unmasked ? 'text' : 'password') : type}
          // disabled={modifiers.disabled}
          // {...forwardedProps}
          // onChange={(event) => {
          //   forwardedProps?.onChange?.(event);
          //   onValueChange?.(event.target.value, event.target);
          // }}
          ref={inputHandleRef}
        />
      </FieldBase>
    );
  },
);

TextInputField.theme = textInputFieldTheme;
TextInputField.displayName = `@sixui/${COMPONENT_NAME}`;
