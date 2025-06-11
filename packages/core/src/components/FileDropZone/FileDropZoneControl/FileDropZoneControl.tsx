import { useCallback, useRef } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import type { IFileDropZoneFile } from '~/hooks/useFileDropZone';
import type { IMaybeAsync } from '~/utils/types';
import type { IFileDropZoneFileCardProps } from '../FileDropZoneFileCard';
import type { IFileDropZoneControlThemeFactory } from './FileDropZoneControl.css';
import type { IFileDropZoneControlFactory } from './FileDropZoneControl.types';
import { iconArrowPath, iconArrowUpTray } from '~/assets/icons';
import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { DropZone } from '~/components/DropZone';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { useOverlays } from '~/components/Overlays';
import { SnackbarOverlay } from '~/components/Snackbar';
import { sortableFactory } from '~/components/Sortable';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import {
  IFileDropZoneFileState,
  useFileDropZone,
} from '~/hooks/useFileDropZone';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { camelCaseFromKebabCase } from '~/utils/camelCaseFromKebabCase';
import { componentFactory } from '~/utils/component/componentFactory';
import { getImageSizeFromFile } from '~/utils/getImageSizeFromFile';
import { getUid } from '~/utils/getUid';
import { FileDropZoneFileCard } from '../FileDropZoneFileCard';
import { COMPONENT_NAME } from './FileDropZoneControl.constants';
import { fileDropZoneControlStrings } from './FileDropZoneControl.strings';
import { getFormattedConstraints } from './utils/getFormattedConstraints';
import { validateImageSize } from './utils/validateImageSize';
import { fileDropZoneControlTheme } from './FileDropZoneControl.css';

const Sortable = sortableFactory<IFileDropZoneFile>({
  getItemId: (item) => item.internalId,
});

export const FileDropZoneControl =
  componentFactory<IFileDropZoneControlFactory>((props, forwardedRef) => {
    const {
      id,
      classNames,
      className,
      styles,
      style,
      variant,
      supportingText,
      trailingSupportingText: trailingSupportingTextProp,
      hasError: hasErrorProp,
      errorText: errorTextProp,
      value,
      defaultValue,
      maxFileCount,
      maxFileSize,
      capture,
      required,
      extraActions,
      sortable: sortableProp,
      initializeFile,
      onAccept,
      onReject,
      onError,
      onDelete,
      onReorder,
      onRetry,
      onChange,
      onSuccess,
      onProcessing,
      getIconFromMimeType,
      disabled,
      acceptedFileTypes,
      rootRef,
      strings = fileDropZoneControlStrings,
      uploadIcon,
      acceptedImageSize,
      retryIcon: retryIconProp,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const overlays = useOverlays();
    const internalInputRef = useRef<HTMLInputElement>(null);

    const {
      files,
      handleAccept,
      handleReject,
      handleDelete,
      handleReorder,
      handleRetry,
    } = useFileDropZone({
      value,
      defaultValue,
      initializeFile,
      onAccept,
      onReject,
      onError,
      onDelete,
      onReorder,
      onRetry,
      onChange,
      onSuccess,
      onProcessing,
    });

    const acceptFile = useCallback(
      (file: File): IMaybeAsync<unknown> =>
        handleAccept({
          internalId: getUid(),
          state: IFileDropZoneFileState.Initialized,
          thumbUrl: file.type.startsWith('image/')
            ? URL.createObjectURL(file)
            : undefined,
          name: file.name,
          size: file.size,
          mimeType: file.type,
          file: file,
          abortController: new AbortController(),
        }),
      [handleAccept],
    );

    const rejectFile = useCallback(
      (fileRejection: FileRejection): IMaybeAsync<unknown> =>
        handleReject({
          internalId: getUid(),
          state: IFileDropZoneFileState.Initialized,
          thumbUrl: fileRejection.file.type.startsWith('image/')
            ? URL.createObjectURL(fileRejection.file)
            : undefined,
          name: fileRejection.file.name,
          size: fileRejection.file.size,
          mimeType: fileRejection.file.type,
          file: fileRejection.file,
          errorTextList: fileRejection.errors.map(
            ({ code }) =>
              strings.errors[
                camelCaseFromKebabCase(code) as keyof (typeof strings)['errors']
              ],
          ),
        }),
      [handleReject, strings],
    );

    const handleError = useCallback(
      (error: Error) => {
        onError?.(error);

        void overlays.open(SnackbarOverlay, {
          children: error.message,
        });
      },
      [onError, overlays],
    );

    const handleDrop = useCallback(
      (acceptedFiles: Array<File>, rejectedFiles: Array<FileRejection>) => {
        acceptedFiles.forEach((file) => {
          const isImage = file.type.startsWith('image/');
          const hasSizeConstraints = !!acceptedImageSize;

          if (isImage && hasSizeConstraints) {
            void getImageSizeFromFile(file)
              .then((imageSize) => {
                const sizeValidationResult = validateImageSize(
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

            if (internalInputRef.current) {
              // Manually set the files property of the input element
              const dataTransfer = new DataTransfer();
              acceptedFiles.forEach((file) => dataTransfer.items.add(file));
              internalInputRef.current.files = dataTransfer.files;
            }
          }
        });

        rejectedFiles.forEach(rejectFile);
      },
      [acceptFile, rejectFile, acceptedImageSize, internalInputRef],
    );

    const fileCount = files.length;
    const hasTooManyFiles =
      maxFileCount !== undefined &&
      maxFileCount > 1 &&
      fileCount > maxFileCount;
    const errorText = hasTooManyFiles
      ? strings.errors.tooManyFiles
      : errorTextProp;
    const trailingSupportingText = hasTooManyFiles
      ? `${fileCount} / ${maxFileCount}`
      : trailingSupportingTextProp;
    const maxUploadableFiles =
      maxFileCount !== undefined
        ? Math.max(maxFileCount - files.length, 0)
        : undefined;
    const multiple = maxFileCount === undefined || maxFileCount > 1;
    const sortable = multiple && files.length > 1 && sortableProp;

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

    const { getStyles } = useComponentTheme<IFileDropZoneControlThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fileDropZoneControlTheme,
    });

    const handleInputRef = useMergeRefs(
      forwardedRef,
      internalInputRef,
      inputRef,
    );
    const dropping = isDragActive && !disabled;

    const renderFileCard = (
      file: IFileDropZoneFile,
      other: Partial<IFileDropZoneFileCardProps>,
    ): React.ReactNode => (
      <FileDropZoneFileCard
        key={file.internalId}
        file={file}
        supportingText={
          file.state === IFileDropZoneFileState.Initializing
            ? strings.loading
            : file.supportingText
        }
        icon={getIconFromMimeType?.(file.mimeType)}
        disabled={disabled}
        extraActions={
          file.canRetry &&
          onRetry && (
            <IconButton
              icon={retryIconProp ?? <SvgIcon icon={iconArrowPath} />}
              onClick={() => handleRetry(file)}
            />
          )
        }
        moveHandle={sortable}
        {...other}
      />
    );

    const renderFiles = (): React.ReactNode => (
      <Flex direction="column" gap="$sm" w="100%">
        {sortable ? (
          <Sortable
            value={files}
            onReorder={handleReorder}
            onDelete={handleDelete}
            axis="vertical"
          >
            {({ sortableItems }) =>
              sortableItems.map((sortableItem) => (
                <Sortable.Item
                  key={sortableItem.item.internalId}
                  id={sortableItem.item.internalId}
                >
                  {({ getItemProps, getDragHandleProps }) =>
                    renderFileCard(sortableItem.item, {
                      ...getItemProps(),
                      ...getDragHandleProps(),
                      onDelete: sortableItem.onDelete,
                      loading:
                        sortableItem.item.state ===
                          IFileDropZoneFileState.Uploading ||
                        sortableItem.itemProcessing,
                    })
                  }
                </Sortable.Item>
              ))
            }
          </Sortable>
        ) : (
          files.map((file) =>
            renderFileCard(file, {
              onDelete: handleDelete,
            }),
          )
        )}
      </Flex>
    );

    return (
      <Box
        {...getStyles('root', {
          modifiers: {
            disabled,
            'with-error': hasError,
          },
        })}
        ref={rootRef}
        {...other}
      >
        <input
          {...getInputProps()}
          id={id}
          ref={handleInputRef}
          capture={capture}
          required={required}
        />
        {!multiple && files.length > 0 ? (
          renderFiles()
        ) : (
          <DropZone
            {...getRootProps()}
            {...getStyles('dropZone')}
            dropping={dropping}
            onClick={extraActions ? undefined : browse}
            disabled={disabled}
            label={
              multiple ? strings.labels.dragMultiple : strings.labels.dragSingle
            }
            actionIcon={uploadIcon ?? <SvgIcon icon={iconArrowUpTray} />}
            actionLabel={extraActions ? undefined : strings.actions.browse}
            supportingText={
              supportingText ??
              getFormattedConstraints({
                acceptedFileTypes,
                acceptedImageSize,
                maxFileCount,
                maxFileSize,
                strings: strings.imageSizeConstraints,
              })
            }
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
                    {strings.actions.browse}
                  </Button>
                  {extraActions}
                </>
              </div>
            )}
          </DropZone>
        )}

        {multiple && files.length > 0 && renderFiles()}
      </Box>
    );
  });

FileDropZoneControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
FileDropZoneControl.theme = fileDropZoneControlTheme;
