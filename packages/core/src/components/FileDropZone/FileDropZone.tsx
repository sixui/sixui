import type {
  IFileDropZoneFactory,
  IFileDropZoneProps,
} from './FileDropZone.types';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FileDropZone.constants';
import { FileDropZoneControl } from './FileDropZoneControl';
import { fileDropZoneTheme } from './FileDropZone.css';

export const FileDropZone = componentFactory<IFileDropZoneFactory>(
  (props, forwardedRef) => {
    const {
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

    return (
      <Labeled
        label={label}
        trailingAction={trailingAction}
        supportingText={supportingText}
        trailingSupportingText={trailingSupportingText}
        requiredSign={requiredSign}
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

FileDropZone.displayName = `@sixui/core/${COMPONENT_NAME}`;
FileDropZone.theme = fileDropZoneTheme;
