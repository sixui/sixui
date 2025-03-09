import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

import type { IMaybeAsync } from '~/utils/types';
import type { IFileDropZoneThemeFactory } from './FileDropZone.css';
import type { IFileDropZoneFactory } from './FileDropZone.types';
import { iconArrowUpTray } from '~/assets/icons';
import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { DropZone } from '~/components/DropZone';
import { Flex } from '~/components/Flex';
import { useOverlays } from '~/components/Overlays';
import { SnackbarOverlay } from '~/components/Snackbar';
import { sortableFactory } from '~/components/Sortable';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import {
  IFileDropZoneFileInfo,
  useFileDropZone,
} from '~/hooks/useFileDropZone';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { camelCaseFromKebabCase } from '~/utils/camelCaseFromKebabCase';
import { componentFactory } from '~/utils/component/componentFactory';
import { getImageSizeFromFile } from '~/utils/getImageSizeFromFile';
import { getUid } from '~/utils/getUid';
import { COMPONENT_NAME } from './FileDropZone.constants';
import { fileDropZoneStrings } from './FileDropZone.strings';
import { FileDropZoneFileCard } from './FileDropZoneFileCard';
import { getFormattedConstraints } from './utils/getFormattedConstraints';
import { validateImageSize } from './utils/validateImageSize';
import { fileDropZoneTheme } from './FileDropZone.css';

const Sortable = sortableFactory<IFileDropZoneFileInfo>({
  getItemId: (item) => item.internalId,
});

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
      initialFiles = [],
      maxFileCount,
      maxFileSize,
      capture,
      extraActions,
      sortable: sortableProp,
      onAccept,
      onReject,
      onDelete,
      onReorder,
      onChange,
      getIconFromMimeType,
      disabled,
      acceptedFileTypes,
      rootRef,
      strings = fileDropZoneStrings,
      uploadIcon,
      acceptedImageSize,
      ...other
    } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const overlays = useOverlays();

    const { files, handleAccept, handleReject, handleDelete, handleReorder } =
      useFileDropZone({
        initialFiles,
        onAccept,
        onReject,
        onDelete,
        onReorder,
        onChange,
      });

    const acceptFile = useCallback(
      (file: File): IMaybeAsync<unknown> =>
        handleAccept({
          internalId: getUid(),
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
          }
        });

        rejectedFiles.forEach(rejectFile);
      },
      [acceptFile, rejectFile, acceptedImageSize],
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
    const sortable = multiple && files.length > 0 && sortableProp;

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

    const handleInputRef = useMergeRefs(forwardedRef, inputRef);
    const dropping = isDragActive && !disabled;

    const renderChildren = (): React.ReactNode => (
      <Flex direction="column" gap="$sm" w="100%">
        {sortable ? (
          <Sortable
            items={files}
            onReorder={handleReorder}
            onDelete={handleDelete}
            axis="vertical"
          >
            {({ sortableItems }) =>
              sortableItems.map((sortableItem) => (
                <Sortable.Item
                  as={FileDropZone.FileCard}
                  key={sortableItem.item.internalId}
                  id={sortableItem.item.internalId}
                  file={sortableItem.item}
                  icon={getIconFromMimeType(sortableItem.item.mimeType)}
                  onDelete={sortableItem.onDelete}
                  loading={sortableItem.itemProcessing}
                  moveHandle
                />
              ))
            }
          </Sortable>
        ) : (
          files.map((file) => (
            <FileDropZone.FileCard
              key={file.internalId}
              id={file.internalId}
              file={file}
              icon={getIconFromMimeType(file.mimeType)}
              onDelete={handleDelete}
            />
          ))
        )}
      </Flex>
    );

    return (
      <Box {...getStyles('root')} ref={rootRef} {...other}>
        <input
          {...getInputProps()}
          {...other}
          ref={handleInputRef}
          capture={capture}
        />
        {!multiple && files.length > 0 ? (
          renderChildren()
        ) : (
          <DropZone
            {...getRootProps()}
            {...getStyles('dropZone')}
            dropping={dropping}
            onClick={extraActions ? undefined : browse}
            disabled={disabled}
            label={
              multiple ? strings.label.dragMultiple : strings.label.dragSingle
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

        {multiple && files.length > 0 && renderChildren()}
      </Box>
    );
  },
);

FileDropZone.theme = fileDropZoneTheme;
FileDropZone.displayName = `@sixui/core/${COMPONENT_NAME}`;
FileDropZone.FileCard = FileDropZoneFileCard;
