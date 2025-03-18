import type { IFileDropZoneFileCardFactory } from './FileDropZoneFileCard.types';
import { iconArrowDownTray } from '~/assets/icons';
import { FileCard } from '~/components/FileCard';
import { IconButton } from '~/components/IconButton';
import { SvgIcon } from '~/components/SvgIcon';
import { useProps } from '~/components/Theme';
import { IFileDropZoneFileState } from '~/hooks/useFileDropZone';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FileDropZoneFileCard.constants';
import { fileDropZoneFileCardTheme } from './FileDropZoneFileCard.css';

export const FileDropZoneFileCard =
  componentFactory<IFileDropZoneFileCardFactory>((props, forwardedRef) => {
    const { file, onDelete, downloadIcon, disabled, extraActions, ...other } =
      useProps({
        componentName: COMPONENT_NAME,
        props,
      });

    return (
      <FileCard
        ref={forwardedRef}
        thumbUrl={file.thumbUrl}
        fileName={file.name ?? file.id}
        fileSize={file.size}
        supportingText={file.supportingText}
        loading={file.state === IFileDropZoneFileState.Uploading}
        initializing={file.state === IFileDropZoneFileState.Initializing}
        disabled={
          disabled || file.state === IFileDropZoneFileState.Initializing
        }
        progress={file.progress}
        hasError={file.state === IFileDropZoneFileState.Error}
        errorText={file.errorTextList?.join(' / ')}
        onDelete={onDelete ? () => onDelete(file) : undefined}
        extraActions={
          <>
            {!!file.downloadUrl && (
              <IconButton
                icon={downloadIcon ?? <SvgIcon icon={iconArrowDownTray} />}
                href={file.downloadUrl}
                target="_blank"
                variant="filled"
              />
            )}
            {extraActions}
          </>
        }
        {...other}
      />
    );
  });

FileDropZoneFileCard.displayName = `@sixui/core/${COMPONENT_NAME}`;
FileDropZoneFileCard.theme = fileDropZoneFileCardTheme;
