import type { ITextInputThemeFactory } from './TextInput.css';
import type { ITextInputFactory, ITextInputProps } from './TextInput.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './TextInput.constants';
import { TextInputControl } from './TextInputControl';
import { textInputTheme } from './TextInput.css';

/**
 * @see https://m3.material.io/components/text-fields/overview
 */
export const TextInput = componentFactory<ITextInputFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      label,
      supportingText,
      requiredSign,
      errorText,
      disableOnLoading,
      labeledProps,
      controlProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } =
      extractBoxProps<ITextInputProps>(other);

    const { getStyles } = useComponentTheme<ITextInputThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: textInputTheme,
    });

    return (
      <Labeled
        {...getStyles('root')}
        label={label}
        supportingText={supportingText}
        errorTextPosition="end"
        requiredSign={requiredSign}
        id={other.id}
        required={other.required}
        disabled={other.disabled}
        readOnly={other.readOnly}
        loading={other.loading}
        disableOnLoading={disableOnLoading}
        hasError={other.hasError}
        errorText={errorText}
        {...labeledProps}
        {...boxProps}
      >
        <TextInputControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

TextInput.theme = textInputTheme;
TextInput.displayName = `@sixui/core/${COMPONENT_NAME}`;
TextInput.Control = TextInputControl;
