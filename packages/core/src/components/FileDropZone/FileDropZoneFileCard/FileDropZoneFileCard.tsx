import type { IFileDropZoneFileCardThemeFactory } from './FileDropZoneFileCard.css';
import type { IFileDropZoneFileCardFactory } from './FileDropZoneFileCard.types';
import { iconArrowDownTray } from '~/assets/icons';
import { FileCard } from '~/components/FileCard';
import { IconButton } from '~/components/IconButton';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './FileDropZoneFileCard.constants';
import { fileDropZoneFileCardTheme } from './FileDropZoneFileCard.css';

export const FileDropZoneFileCard =
  componentFactory<IFileDropZoneFileCardFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      file,
      onDelete,
      downloadIcon,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IFileDropZoneFileCardThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fileDropZoneFileCardTheme,
    });

    return (
      <FileCard
        {...getStyles('root')}
        ref={forwardedRef}
        thumbUrl={file.thumbUrl}
        fileName={file.name}
        fileSize={file.size}
        loading={file.loading}
        supportingText={file.supportingText}
        progress={file.progress}
        hasError={!!file.errorTextList?.length}
        errorText={file.errorTextList?.join(' / ')}
        onDelete={onDelete ? () => onDelete(file) : undefined}
        extraActions={
          !!file.downloadUrl && (
            <IconButton
              icon={downloadIcon ?? <SvgIcon icon={iconArrowDownTray} />}
              href={file.downloadUrl}
              target="_blank"
              variant="filled"
            />
          )
        }
        {...other}
      />
    );
  });

FileDropZoneFileCard.theme = fileDropZoneFileCardTheme;
FileDropZoneFileCard.displayName = `@sixui/core/${COMPONENT_NAME}`;
