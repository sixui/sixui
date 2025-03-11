import type { IColorInputFactory, IColorInputProps } from './ColorInput.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './ColorInput.constants';
import { ColorInputControl } from './ColorInputControl';

export const ColorInput = componentFactory<IColorInputFactory>(
  (props, forwardedRef) => {
    const {
      label,
      supportingText,
      requiredSign,
      errorText,
      readOnlyOnLoading,
      labeledProps,
      controlProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } =
      extractBoxProps<IColorInputProps>(other);

    return (
      <Labeled
        label={label}
        supportingText={supportingText}
        errorTextPosition="end"
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
        <ColorInputControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

ColorInput.displayName = `@sixui/core/${COMPONENT_NAME}`;
ColorInput.Control = ColorInputControl;
