import type { IFileDropZoneFileCardsThemeFactory } from './FileDropZoneFileCards.css';
import type { IFileDropZoneFileCardsFactory } from './FileDropZoneFileCards.types';
import { iconArrowDownTray } from '~/assets/icons';
import { Box } from '~/components/Box';
import { FileCard } from '~/components/FileCard';
import { IconButton } from '~/components/IconButton';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FileDropZoneFileCards.constants';
import { fileDropZoneFileCardsTheme } from './FileDropZoneFileCards.css';

export const FileDropZoneFileCards =
  componentFactory<IFileDropZoneFileCardsFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      files,
      onDelete,
      downloadIcon,
      hideMetadata,
      fileIconRenderer,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IFileDropZoneFileCardsThemeFactory>(
      {
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: fileDropZoneFileCardsTheme,
      },
    );

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {files.map(
          (file, fileIndex): React.ReactNode => (
            <FileCard
              {...getStyles('fileCard')}
              key={fileIndex}
              icon={fileIconRenderer?.(file.mimeType)}
              thumbUrl={file.thumbUrl}
              fileName={file.name}
              fileSize={file.size}
              loading={file.loading}
              supportingText={file.supportingText}
              progress={file.progress}
              hasError={!!file.errorTextList?.length}
              errorText={file.errorTextList?.join(' / ')}
              onDelete={onDelete ? () => void onDelete(file) : undefined}
              hideMetadata={hideMetadata}
              extraActions={
                <>
                  {!!file.downloadUrl && (
                    <IconButton
                      icon={
                        downloadIcon ?? <SvgIcon icon={iconArrowDownTray} />
                      }
                      href={file.downloadUrl}
                      target="_blank"
                      variant="filled"
                    />
                  )}
                </>
              }
            />
          ),
        )}
      </Box>
    );
  });

FileDropZoneFileCards.theme = fileDropZoneFileCardsTheme;
FileDropZoneFileCards.displayName = `@sixui/core/${COMPONENT_NAME}`;
