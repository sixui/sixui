import type { ITextAreaFactory, ITextAreaProps } from './TextArea.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './TextArea.constants';
import { TextAreaControl } from './TextAreaControl';
import { textAreaTheme } from './TextArea.css';

/**
 * @see https://m3.material.io/components/text-fields/overview
 */
export const TextArea = componentFactory<ITextAreaFactory>(
  (props, forwardedRef) => {
    const {
      label,
      supportingText,
      withRequiredSign,
      requiredSign,
      errorText,
      readOnlyOnLoading,
      labeledProps,
      controlProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: otherExceptBoxProps } =
      extractBoxProps<ITextAreaProps>(other);

    return (
      <Labeled
        label={label}
        supportingText={supportingText}
        errorTextPosition="end"
        withRequiredSign={withRequiredSign}
        requiredSign={requiredSign}
        id={other.id}
        required={other.required}
        disabled={other.disabled}
        readOnly={other.readOnly}
        loading={other.loading}
        readOnlyOnLoading={readOnlyOnLoading}
        hasError={other.hasError}
        errorText={errorText}
        {...labeledProps}
        {...boxProps}
      >
        <TextAreaControl
          ref={forwardedRef}
          {...controlProps}
          {...otherExceptBoxProps}
        />
      </Labeled>
    );
  },
);

TextArea.displayName = `@sixui/core/${COMPONENT_NAME}`;
TextArea.theme = textAreaTheme;
TextArea.Control = TextAreaControl;
