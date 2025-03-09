import { useEffect, useState } from 'react';

import type { IMaybeAsync } from '~/utils/types';
import { isFunction } from '~/utils/isFunction';

export interface IFileDropZoneFile {
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

type IUpdateFileFunc = (
  update:
    | Partial<IFileDropZoneFile>
    | ((prevFile: IFileDropZoneFile) => Partial<IFileDropZoneFile>),
) => void;

export interface IUseFileDropZoneProps {
  initialFiles?: Array<IFileDropZoneFile>;
  onAccept?: (
    file: IFileDropZoneFile,
    updateFile: IUpdateFileFunc,
  ) => IMaybeAsync<unknown>;
  onReject?: (
    file: IFileDropZoneFile,
    updateFile: IUpdateFileFunc,
  ) => IMaybeAsync<unknown>;
  onError?: (
    error: unknown,
    file?: IFileDropZoneFile,
    updateFile?: IUpdateFileFunc,
  ) => IMaybeAsync<unknown>;
  onDelete?: (file: IFileDropZoneFile) => IMaybeAsync<unknown>;
  onReorder?: (files: Array<IFileDropZoneFile>) => IMaybeAsync<unknown>;
  onRetry?: (
    file: IFileDropZoneFile,
    updateFile: IUpdateFileFunc,
  ) => IMaybeAsync<unknown>;
  onChange?: (files: Array<IFileDropZoneFile>) => IMaybeAsync<unknown>;
}
export interface IUseFileDropZoneResult {
  files: Array<IFileDropZoneFile>;
  handleAccept: (file: IFileDropZoneFile) => Promise<void>;
  handleReject: (file: IFileDropZoneFile) => Promise<void>;
  handleDelete: (file: IFileDropZoneFile) => Promise<void>;
  handleReorder: (files: Array<IFileDropZoneFile>) => Promise<void>;
  handleRetry: (file: IFileDropZoneFile) => Promise<void>;
}

export const useFileDropZone = (
  props: IUseFileDropZoneProps,
): IUseFileDropZoneResult => {
  const {
    initialFiles = [],
    onAccept,
    onReject,
    onError,
    onDelete,
    onReorder,
    onRetry,
    onChange,
  } = props;

  const [files, setFiles] = useState<Array<IFileDropZoneFile>>(initialFiles);

  useEffect(() => {
    // Keep the parent component in sync with the files state.
    if (files !== initialFiles) {
      onChange?.(files);
    }
  }, [files, onChange, initialFiles]);

  const updateFile = (
    internalId: string,
    update:
      | Partial<IFileDropZoneFile>
      | ((prevFile: IFileDropZoneFile) => Partial<IFileDropZoneFile>),
  ): void => {
    setFiles((prevFiles) =>
      prevFiles.map((prevFile) =>
        prevFile.internalId === internalId
          ? {
              ...prevFile,
              ...(isFunction(update) ? update(prevFile) : update),
            }
          : prevFile,
      ),
    );
  };

  const handleAccept = async (file: IFileDropZoneFile): Promise<void> => {
    const updateTargetFile: IUpdateFileFunc = (update) => {
      updateFile(file.internalId, update);
    };

    try {
      setFiles((prevFiles) => [...prevFiles, file]);
      await onAccept?.(file, updateTargetFile);
    } catch (error) {
      updateTargetFile((prevFile) => ({
        loading: false,
        progress: undefined,
        errorTextList: [
          ...(prevFile.errorTextList ?? []),
          error instanceof Error ? error.message : String(error),
        ],
      }));
      onError?.(error, file, updateTargetFile);
    }
  };

  const handleReject = (file: IFileDropZoneFile): Promise<void> => {
    const updateTargetFile: IUpdateFileFunc = (update) => {
      updateFile(file.internalId, update);
    };

    return Promise.resolve(onReject?.(file, updateTargetFile)).then(() => {
      setFiles((prevFiles) => [
        ...prevFiles,
        {
          internalId: file.internalId,
          thumbUrl: file.thumbUrl,
          name: file.name,
          mimeType: file.mimeType,
          size: file.size,
          errorTextList: file.errorTextList,
        },
      ]);
    });
  };

  const handleDelete = (file: IFileDropZoneFile): Promise<void> => {
    file.abortController?.abort();

    return Promise.resolve(onDelete?.(file)).then(() => {
      setFiles((prevFiles) =>
        prevFiles.filter((prevFile) => prevFile.internalId !== file.internalId),
      );
    });
  };

  const handleReorder = (files: Array<IFileDropZoneFile>): Promise<void> =>
    Promise.resolve(onReorder?.(files)).then(() => {
      setFiles(files);
    });

  const handleRetry = async (file: IFileDropZoneFile): Promise<void> => {
    const updateTargetFile: IUpdateFileFunc = (update) => {
      updateFile(file.internalId, update);
    };

    updateTargetFile({
      errorTextList: undefined,
    });

    try {
      await onRetry?.(file, updateTargetFile);
    } catch (error) {
      updateTargetFile((prevFile) => ({
        loading: false,
        progress: undefined,
        errorTextList: [
          ...(prevFile.errorTextList ?? []),
          error instanceof Error ? error.message : String(error),
        ],
      }));
      onError?.(error, file, updateTargetFile);
    }
  };

  return {
    files,
    handleAccept,
    handleReject,
    handleDelete,
    handleReorder,
    handleRetry,
  };
};
