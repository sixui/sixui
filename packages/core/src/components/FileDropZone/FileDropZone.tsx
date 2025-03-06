import { Fragment, useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import type { IFileCardProps } from '~/components/FileCard';
import type { IMaybeAsync } from '~/utils/types';
import type { IFileDropZoneThemeFactory } from './FileDropZone.css';
import type { IFileDropZoneFactory } from './FileDropZone.types';
import { iconArrowDownTray, iconArrowUpTray } from '~/assets/icons';
import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { DropZone } from '~/components/DropZone';
import { FileCard } from '~/components/FileCard';
import { IconButton } from '~/components/IconButton';
import { useOverlays } from '~/components/Overlays';
import { SnackbarOverlay } from '~/components/Snackbar';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { camelCaseFromKebabCase } from '~/utils/camelCaseFromKebabCase';
import { componentFactory } from '~/utils/component/componentFactory';
import { getImageSizeFromFile } from '~/utils/getImageSizeFromFile';
import { validateSize } from '~/utils/validateSize';
import { COMPONENT_NAME } from './FileDropZone.constants';
import { fileDropZoneTheme } from './FileDropZone.css';

export const FileDropZone = componentFactory<IFileDropZoneFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      supportingText,
      trailingSupportingText: trailingSupportingTextProp,
      hasError: hasErrorProp,
      errorText: errorTextProp,
      files,
      maxFileCount,
      maxFileSize,
      capture,
      extraActions,
      onAccept,
      onReject,
      onDelete,
      renderFileItem = (props: IFileCardProps) => (
        <FileCard {...getStyles('fileCard')} {...props} />
      ),
      disabled,
      acceptedFileTypes,
      renderFileIcon,
      rootRef,
      strings = {
        dragSingle: 'Drag and drop a file here, or:',
        dragMultiple: 'Drag and drop files here, or:',
        browse: 'Browse...',
        fileInvalidType: 'Invalid file type',
        fileTooLarge: 'File too large',
        fileTooSmall: 'File too small',
        tooManyFiles: 'Too many files',
        invalidImageSize: 'Invalid image size',
        unknownError: 'Unknown error',
      },
      uploadIcon,
      downloadIcon,
      hideMetadata,
      acceptedImageSize,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const overlays = useOverlays();

    const acceptFile = useCallback(
      (file: File): IMaybeAsync<unknown> =>
        onAccept?.({
          key: String(Math.random()),
          thumbUrl: file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : undefined,
          name: file.name,
          size: file.size,
          mimeType: file.type,
          file: file,
          abortController: new AbortController(),
        }),
      [onAccept],
    );

    const rejectFile = useCallback(
      (fileRejection: FileRejection): IMaybeAsync<unknown> =>
        onReject?.({
          key: String(Math.random()),
          thumbUrl: fileRejection.file.type.startsWith('image/')
            ? URL.createObjectURL(fileRejection.file)
            : undefined,
          name: fileRejection.file.name,
          size: fileRejection.file.size,
          mimeType: fileRejection.file.type,
          file: fileRejection.file,
          errorTextList: fileRejection.errors.map(
            ({ code }) =>
              strings[camelCaseFromKebabCase(code) as keyof typeof strings],
          ),
        }),
      [onReject, strings],
    );

    const handleError = useCallback(
      (error: Error) =>
        void overlays.open(SnackbarOverlay, {
          children: error.message,
        }),
      [overlays],
    );

    const handleDrop = useCallback(
      (acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
        acceptedFiles.forEach((file) => {
          const isImage = file.type.startsWith('image/');
          const hasSizeConstraints = !!acceptedImageSize;

          if (isImage && hasSizeConstraints) {
            void getImageSizeFromFile(file)
              .then((imageSize) => {
                const sizeValidationResult = validateSize(
                  imageSize,
                  acceptedImageSize,
                );
                if (sizeValidationResult === true) {
                  acceptFile(file);
                } else {
                  rejectFile({
                    file,
                    errors: [
                      {
                        message: 'Invalid image size',
                        code: 'invalidImageSize',
                      },
                    ],
                  });
                }
              })
              .catch((error: unknown) => {
                rejectFile({
                  file,
                  errors: [
                    {
                      message:
                        error instanceof Error
                          ? error.message
                          : 'Unknown error',
                      code: 'unknownError',
                    },
                  ],
                });
              });
          } else {
            acceptFile(file);
          }
        });

        rejectedFiles.forEach(rejectFile);
      },
      [acceptFile, rejectFile, acceptedImageSize],
    );

    const fileCount = files?.length;
    const hasTooManyFiles =
      maxFileCount !== undefined &&
      fileCount !== undefined &&
      maxFileCount > 1 &&
      fileCount > maxFileCount;
    const errorText = hasTooManyFiles ? strings.tooManyFiles : errorTextProp;
    const trailingSupportingText = hasTooManyFiles
      ? `${fileCount} / ${maxFileCount}`
      : trailingSupportingTextProp;
    const maxUploadableFiles =
      maxFileCount !== undefined
        ? Math.max(maxFileCount - (files?.length ?? 0), 0)
        : undefined;
    const multiple = maxFileCount === undefined || maxFileCount > 1;

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      open: browse,
      inputRef,
    } = useDropzone({
      noClick: true,
      noKeyboard: true,
      accept: acceptedFileTypes,
      maxSize: maxFileSize,
      maxFiles: maxUploadableFiles,
      multiple,
      onError: handleError,
      onDrop: disabled ? undefined : handleDrop,
    });

    const hasError =
      hasTooManyFiles || hasErrorProp || (isDragActive && isDragReject);

    const { getStyles } = useComponentTheme<IFileDropZoneThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fileDropZoneTheme,
      modifiers: {
        disabled,
        'with-error': hasError,
      },
    });

    const renderFileItems = useCallback(
      () => (
        <div {...getStyles('files')}>
          {files?.map(
            (file, fileIndex): React.ReactNode => (
              <Fragment key={fileIndex}>
                {renderFileItem({
                  icon: renderFileIcon?.(file.mimeType),
                  thumbUrl: file.thumbUrl,
                  fileName: file.name,
                  fileSize: file.size,
                  loading: file.loading,
                  supportingText: file.supportingText,
                  progress: file.progress,
                  hasError: !!file.errorTextList?.length,
                  errorText: file.errorTextList?.join(' / '),
                  onDelete: onDelete ? () => void onDelete(file) : undefined,
                  extraActions: !!file.downloadUrl && (
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
                  ),
                  hideMetadata,
                })}
              </Fragment>
            ),
          )}
        </div>
      ),
      [
        getStyles,
        renderFileIcon,
        files,
        onDelete,
        renderFileItem,
        downloadIcon,
        hideMetadata,
      ],
    );

    const handleInputRef = useMergeRefs(forwardedRef, inputRef);
    const dropping = isDragActive && !disabled;

    return (
      <Box {...getStyles('root')} ref={rootRef} {...other}>
        <input
          {...getInputProps()}
          {...other}
          ref={handleInputRef}
          capture={capture}
        />
        {!multiple && files?.length ? (
          renderFileItems()
        ) : (
          <div {...getRootProps()} {...getStyles('inputContainer')}>
            <DropZone
              {...getStyles('dropZone')}
              dropping={dropping}
              onClick={extraActions ? undefined : browse}
              disabled={disabled}
              label={multiple ? strings.dragMultiple : strings.dragSingle}
              actionIcon={uploadIcon ?? <SvgIcon icon={iconArrowUpTray} />}
              actionLabel={extraActions ? undefined : strings.browse}
              supportingText={supportingText}
              trailingSupportingText={trailingSupportingText}
              hasError={hasError}
              errorText={errorText}
            >
              {extraActions && (
                <div {...getStyles('dropActions')}>
                  <>
                    <Button
                      variant="text"
                      disabled={disabled}
                      onClick={browse}
                      leadingIcon={
                        uploadIcon ?? <SvgIcon icon={iconArrowUpTray} />
                      }
                    >
                      {strings.browse}
                    </Button>
                    {extraActions}
                  </>
                </div>
              )}
            </DropZone>
          </div>
        )}

        {multiple && files?.length ? renderFileItems() : null}
      </Box>
    );
  },
);

FileDropZone.theme = fileDropZoneTheme;
FileDropZone.displayName = `@sixui/core/${COMPONENT_NAME}`;
