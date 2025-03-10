import type {
  IMultiSelectFactory,
  IMultiSelectProps,
} from './MultiSelect.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './MultiSelect.constants';
import { MultiSelectControl } from './MultiSelectControl';

export const MultiSelect = componentFactory<IMultiSelectFactory>(
  (props, forwardedRef) => {
    const {
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
      extractBoxProps<IMultiSelectProps>(other);

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
        disableOnLoading={disableOnLoading}
        hasError={other.hasError}
        errorText={errorText}
        {...labeledProps}
        {...boxProps}
      >
        <MultiSelectControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

MultiSelect.displayName = `@sixui/core/${COMPONENT_NAME}`;
MultiSelect.Control = MultiSelectControl;
