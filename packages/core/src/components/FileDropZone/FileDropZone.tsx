import type { IFileDropZoneThemeFactory } from './FileDropZone.css';
import type {
  IFileDropZoneFactory,
  IFileDropZoneProps,
} from './FileDropZone.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FileDropZone.constants';
import { FileDropZoneControl } from './FileDropZoneControl';
import { fileDropZoneLabeledTheme } from './FileDropZone.css';

export const FileDropZone = componentFactory<IFileDropZoneFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      label,
      trailingAction,
      supportingText,
      trailingSupportingText,
      requiredSign,
      labeledProps,
      controlProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } =
      extractBoxProps<IFileDropZoneProps>(other);

    const { getStyles } = useComponentTheme<IFileDropZoneThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fileDropZoneLabeledTheme,
    });

    return (
      <Labeled
        {...getStyles('root')}
        label={label}
        trailingAction={trailingAction}
        supportingText={supportingText}
        trailingSupportingText={trailingSupportingText}
        requiredSign={requiredSign}
        id={other.id}
        required={other.required}
        disabled={other.disabled}
        readOnly={other.readOnly}
        {...labeledProps}
        {...boxProps}
      >
        <FileDropZoneControl
          ref={forwardedRef}
          {...controlProps}
          {...forwardedProps}
        />
      </Labeled>
    );
  },
);

FileDropZone.theme = fileDropZoneLabeledTheme;
FileDropZone.displayName = `@sixui/core/${COMPONENT_NAME}`;
