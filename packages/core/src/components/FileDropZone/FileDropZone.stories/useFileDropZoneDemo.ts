import { useState } from 'react';

import type { IMaybeAsync } from '~/utils/types';
import type { IFileDropZoneFileInfo } from '../FileDropZone.types';

export interface IUseFileDropZoneDemoProps {
  initialFiles?: Array<IFileDropZoneFileInfo>;
  onAccept?: (file: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  onReject?: (file: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  onDelete?: (file: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  onReorder?: (ids: Array<string>) => IMaybeAsync<unknown>;
}

export interface IUseFileDropZoneDemoResult {
  files: Array<IFileDropZoneFileInfo>;
  handleAccept: (file: IFileDropZoneFileInfo) => Promise<void>;
  handleReject: (file: IFileDropZoneFileInfo) => Promise<void>;
  handleDelete: (file: IFileDropZoneFileInfo) => Promise<void>;
  handleReorder: (ids: Array<string>) => Promise<void>;
}

export const useFileDropZoneDemo = (
  props: IUseFileDropZoneDemoProps,
): IUseFileDropZoneDemoResult => {
  const { initialFiles = [], onAccept, onReject, onDelete, onReorder } = props;

  const [files, setFiles] =
    useState<Array<IFileDropZoneFileInfo>>(initialFiles);

  const handleAccept = (fileInfo: IFileDropZoneFileInfo): Promise<void> =>
    Promise.resolve(onAccept?.(fileInfo)).then(() => {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          key: fileInfo.key,
          thumbUrl: fileInfo.thumbUrl,
          name: fileInfo.name,
          mimeType: fileInfo.mimeType,
          size: fileInfo.size,
        },
      ]);
    });

  const handleReject = (fileInfo: IFileDropZoneFileInfo): Promise<void> =>
    Promise.resolve(onReject?.(fileInfo)).then(() => {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          key: fileInfo.key,
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
        prevFiles.filter((file) => file.key !== fileInfo.key),
      );
    });

  const handleReorder = (ids: Array<string>): Promise<void> =>
    Promise.resolve(onReorder?.(ids)).then(() => {
      setFiles((prevFiles) =>
        ids.map((id) => prevFiles.find((file) => file.key === id)!),
      );
    });

  return {
    files,
    handleAccept,
    handleReject,
    handleDelete,
    handleReorder,
  };
};
