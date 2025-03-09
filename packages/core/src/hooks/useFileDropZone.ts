import { useEffect, useState } from 'react';

import type { IMaybeAsync } from '~/utils/types';

export interface IFileDropZoneFileInfo {
  internalId: string;
  id?: string;
  thumbUrl?: string;
  downloadUrl?: string;
  mimeType: string;
  name: string;
  size: number;
  file?: File;
  loading?: boolean;
  progress?: number;
  errorTextList?: Array<string>;
  canRetry?: boolean;
  supportingText?: string;
  abortController?: AbortController;
}

export interface IUseFileDropZoneProps {
  initialFiles?: Array<IFileDropZoneFileInfo>;
  onAccept?: (file: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  onReject?: (file: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  onDelete?: (file: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  onReorder?: (files: Array<IFileDropZoneFileInfo>) => IMaybeAsync<unknown>;
  onChange?: (files: Array<IFileDropZoneFileInfo>) => void;
}

export interface IUseFileDropZoneResult {
  files: Array<IFileDropZoneFileInfo>;
  handleAccept: (file: IFileDropZoneFileInfo) => Promise<void>;
  handleReject: (file: IFileDropZoneFileInfo) => Promise<void>;
  handleDelete: (file: IFileDropZoneFileInfo) => Promise<void>;
  handleReorder: (files: Array<IFileDropZoneFileInfo>) => Promise<void>;
}

export const useFileDropZone = (
  props: IUseFileDropZoneProps,
): IUseFileDropZoneResult => {
  const {
    initialFiles = [],
    onAccept,
    onReject,
    onDelete,
    onReorder,
    onChange,
  } = props;

  const [files, setFiles] =
    useState<Array<IFileDropZoneFileInfo>>(initialFiles);

  useEffect(() => {
    // Keep the parent component in sync with the files state.
    if (files !== initialFiles) {
      onChange?.(files);
    }
  }, [files, onChange, initialFiles]);

  const handleAccept = async (
    fileInfo: IFileDropZoneFileInfo,
  ): Promise<void> => {
    try {
      await onAccept?.(fileInfo);

      setFiles((prevFiles) => [
        ...prevFiles,
        {
          internalId: fileInfo.internalId,
          thumbUrl: fileInfo.thumbUrl,
          name: fileInfo.name,
          mimeType: fileInfo.mimeType,
          size: fileInfo.size,
        },
      ]);
    } catch (error) {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          internalId: fileInfo.internalId,
          thumbUrl: fileInfo.thumbUrl,
          name: fileInfo.name,
          mimeType: fileInfo.mimeType,
          size: fileInfo.size,
          errorTextList: [
            ...(fileInfo.errorTextList ?? []),
            error instanceof Error ? error.message : String(error),
          ],
        },
      ]);
    }
  };

  const handleReject = (fileInfo: IFileDropZoneFileInfo): Promise<void> =>
    Promise.resolve(onReject?.(fileInfo)).then(() => {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          internalId: fileInfo.internalId,
          thumbUrl: fileInfo.thumbUrl,
          name: fileInfo.name,
          mimeType: fileInfo.mimeType,
          size: fileInfo.size,
          errorTextList: fileInfo.errorTextList,
        },
      ]);
    });

  const handleDelete = (fileInfo: IFileDropZoneFileInfo): Promise<void> =>
    Promise.resolve(onDelete?.(fileInfo)).then(() => {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file.internalId !== fileInfo.internalId),
      );
    });

  const handleReorder = (files: Array<IFileDropZoneFileInfo>): Promise<void> =>
    Promise.resolve(onReorder?.(files)).then(() => {
      setFiles(files);
    });

  return {
    files,
    handleAccept,
    handleReject,
    handleDelete,
    handleReorder,
  };
};
