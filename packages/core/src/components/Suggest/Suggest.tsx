import type { ISuggestFactory, ISuggestProps } from './Suggest.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Suggest.constants';
import { SuggestControl } from './SuggestControl';

export const Suggest = componentFactory<ISuggestFactory>(
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
      extractBoxProps<ISuggestProps>(other);

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
        <SuggestControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

Suggest.displayName = `@sixui/core/${COMPONENT_NAME}`;
Suggest.Control = SuggestControl;
