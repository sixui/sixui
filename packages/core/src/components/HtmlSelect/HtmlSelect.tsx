import type { IHtmlSelectFactory, IHtmlSelectProps } from './HtmlSelect.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './HtmlSelect.constants';
import { HtmlSelectControl } from './HtmlSelectControl';

export const HtmlSelect = componentFactory<IHtmlSelectFactory>(
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
      extractBoxProps<IHtmlSelectProps>(other);

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
        <HtmlSelectControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

HtmlSelect.displayName = `@sixui/core/${COMPONENT_NAME}`;
HtmlSelect.Control = HtmlSelectControl;
