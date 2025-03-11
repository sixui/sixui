import type { ISelectFactory, ISelectProps } from './Select.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Select.constants';
import { SelectControl } from './SelectControl';

export const Select = componentFactory<ISelectFactory>(
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
      extractBoxProps<ISelectProps>(other);

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
        <SelectControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

Select.displayName = `@sixui/core/${COMPONENT_NAME}`;
Select.Control = SelectControl;
