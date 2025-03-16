import type { ILabeledProps } from '~/components/Labeled';
import type { IFileDropZoneFactory } from './FileDropZone.types';
import { Labeled } from '~/components/Labeled';
import { useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FileDropZone.constants';
import { FileDropZoneControl } from './FileDropZoneControl';
import { fileDropZoneTheme } from './FileDropZone.css';

export const FileDropZone = componentFactory<IFileDropZoneFactory>(
  (props, forwardedRef) => {
    const { labeledProps, controlProps, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <Labeled
        {...labeledProps}
        {...(other as ILabeledProps)}
        forwardForeignProps
      >
        {({ foreignProps, ...labeledControlProps }) => (
          <FileDropZoneControl
            ref={forwardedRef}
            {...labeledControlProps}
            {...foreignProps}
            {...controlProps}
          />
        )}
      </Labeled>
    );
  },
);

FileDropZone.displayName = `@sixui/core/${COMPONENT_NAME}`;
FileDropZone.theme = fileDropZoneTheme;
