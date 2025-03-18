import { useEffect, useRef, useState } from 'react';

import type { IMakeOptional, IMaybeAsync } from '~/utils/types';
import { getUid } from '~/utils/getUid';
import { isFunction } from '~/utils/isFunction';
import { scheduleNextTick } from '~/utils/scheduleNextTick';
import { useControlledValue } from './useControlledValue';

export enum IFileDropZoneFileState {
  Unknown,
  Initializing,
  Initialized,
  Uploading,
  Uploaded,
  Error,
}

export interface IFileDropZoneFile {
  internalId: string;
  id?: string;
  state?: IFileDropZoneFileState;
  thumbUrl?: string;
  downloadUrl?: string;
  mimeType?: string;
  name?: string;
  size?: number;
  file?: File;
  progress?: number;
  errorTextList?: Array<string>;
  canRetry?: boolean;
  supportingText?: string;
  abortController?: AbortController;
}

export type IFileDropZoneInputFile = IMakeOptional<
  IFileDropZoneFile,
  'internalId'
>;

type IUpdateInternalFileFunc = (
  update:
    | Partial<IFileDropZoneFile>
    | ((prevFile: IFileDropZoneFile) => Partial<IFileDropZoneFile>),
) => void;

export interface IUseFileDropZoneProps {
  value?: Array<IFileDropZoneInputFile>;
  defaultValue?: Array<IFileDropZoneInputFile>;
  initializeFile?: (
    inputFile: IFileDropZoneInputFile,
  ) => IMaybeAsync<IFileDropZoneInputFile | undefined>;
  onAccept?: (
    file: IFileDropZoneFile,
    updateInternalFile: IUpdateInternalFileFunc,
  ) => IMaybeAsync<void>;
  onReject?: (
    file: IFileDropZoneFile,
    updateFile: IUpdateInternalFileFunc,
  ) => IMaybeAsync<void>;
  onError?: (
    error: unknown,
    file?: IFileDropZoneFile,
    updateFile?: IUpdateInternalFileFunc,
  ) => void;
  onDelete?: (file: IFileDropZoneFile) => IMaybeAsync<void>;
  onReorder?: (files: Array<IFileDropZoneFile>) => IMaybeAsync<void>;
  onRetry?: (
    file: IFileDropZoneFile,
    updateFile: IUpdateInternalFileFunc,
  ) => IMaybeAsync<void>;
  onSuccess?: (file: IFileDropZoneFile) => IMaybeAsync<void>;
  onChange?: (inputFiles: Array<IFileDropZoneInputFile>) => void;
  onProcessing?: (processing: boolean, count: number) => void;
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
    value: valueProp,
    defaultValue,
    initializeFile,
    onAccept,
    onReject,
    onError,
    onDelete,
    onReorder,
    onRetry,
    onSuccess,
    onChange,
    onProcessing,
  } = props;

  const [value] = useControlledValue({
    controlled: valueProp,
    default: defaultValue ?? [],
    name: 'FileDropZone',
    onValueChange: (value) => onChange?.(value),
  });

  const processingCounterRef = useRef(0);
  const [files, setInternalFiles] = useState<Array<IFileDropZoneFile>>([]);

  const filesRef = useRef<Array<IFileDropZoneFile>>([]);
  filesRef.current = files;

  const updateInternalFile = (
    internalId: string,
    update:
      | Partial<IFileDropZoneFile>
      | ((prevFile: IFileDropZoneFile) => Partial<IFileDropZoneFile>),
  ): void => {
    setInternalFiles((prevInternalFiles) =>
      prevInternalFiles.map((prevInternalFile) =>
        prevInternalFile.internalId === internalId
          ? {
              ...prevInternalFile,
              ...(isFunction(update) ? update(prevInternalFile) : update),
            }
          : prevInternalFile,
      ),
    );
  };

  useEffect(() => {
    value.forEach((currentInputFile) => {
      const file = filesRef.current.find(
        (file) => file.id === currentInputFile.id,
      );

      const internalId = file?.internalId ?? currentInputFile.id ?? getUid();

      if (!currentInputFile.state && initializeFile) {
        if (file) {
          updateInternalFile(internalId, (prevFile) => ({
            ...prevFile,
            state: IFileDropZoneFileState.Initializing,
          }));
        }

        void Promise.resolve(initializeFile(currentInputFile)).then(
          (currentInputFile) => {
            updateInternalFile(internalId, (prevFile) => ({
              ...prevFile,
              ...currentInputFile,
              state:
                currentInputFile?.state || IFileDropZoneFileState.Initialized,
            }));
          },
        );
      }

      if (!file) {
        setInternalFiles((prevInternalFiles) => [
          ...prevInternalFiles,
          {
            ...currentInputFile,
            internalId,
            state:
              currentInputFile.state ?? IFileDropZoneFileState.Initializing,
          },
        ]);
      }
    });
  }, [value, initializeFile]);

  const handleAccept = async (file: IFileDropZoneFile): Promise<void> => {
    const updateFile: IUpdateInternalFileFunc = (update) => {
      updateInternalFile(file.internalId, update);
    };

    handleProcessingStart();

    try {
      setInternalFiles((prevInternalFiles) => [
        ...prevInternalFiles,
        {
          ...file,
          state: IFileDropZoneFileState.Uploading,
          progress: undefined,
          canRetry: false,
        },
      ]);

      await onAccept?.(file, updateFile);

      updateFile({
        state: IFileDropZoneFileState.Uploaded,
      });

      // Use scheduleNextTick() to ensure that the filesRef is updated
      // after the state change.
      scheduleNextTick(() => {
        const currentInternalFile = filesRef.current.find(
          (currentFile) => currentFile.internalId === file.internalId,
        );
        if (currentInternalFile) {
          void onSuccess?.(currentInternalFile);
        }
        onChange?.(filesRef.current);
      });
    } catch (error) {
      updateFile((prevFile) => ({
        state: IFileDropZoneFileState.Error,
        errorTextList: [
          ...(prevFile.errorTextList ?? []),
          error instanceof Error ? error.message : String(error),
        ],
      }));
      onError?.(error, file, updateFile);
    } finally {
      handleProcessingEnd();
    }
  };

  const handleReject = async (file: IFileDropZoneFile): Promise<void> => {
    const updateFile: IUpdateInternalFileFunc = (update) => {
      updateInternalFile(file.internalId, update);
    };

    setInternalFiles((prevFiles) => [...prevFiles, file]);
    await onReject?.(file, updateFile);

    // Use scheduleNextTick() to ensure that the filesRef is updated
    // after the state change.
    scheduleNextTick(() => {
      onChange?.(filesRef.current);
    });
  };

  const handleDelete = async (file: IFileDropZoneFile): Promise<void> => {
    file.abortController?.abort();

    await onDelete?.(file);
    setInternalFiles((prevFiles) =>
      prevFiles.filter((prevFile) => prevFile.internalId !== file.internalId),
    );

    // Use scheduleNextTick() to ensure that the filesRef is updated
    // after the state change.
    scheduleNextTick(() => {
      onChange?.(filesRef.current);
    });
  };

  const handleReorder = async (
    files: Array<IFileDropZoneFile>,
  ): Promise<void> => {
    await onReorder?.(files);
    setInternalFiles(files);

    // Use scheduleNextTick() to ensure that the filesRef is updated
    // after the state change.
    scheduleNextTick(() => {
      onChange?.(filesRef.current);
    });
  };

  const handleProcessingStart = (): void => {
    processingCounterRef.current += 1;
    onProcessing?.(true, processingCounterRef.current);
  };

  const handleProcessingEnd = (): void => {
    processingCounterRef.current -= 1;
    onProcessing?.(
      processingCounterRef.current > 0,
      processingCounterRef.current,
    );
  };

  const handleRetry = async (file: IFileDropZoneFile): Promise<void> => {
    const updateFile: IUpdateInternalFileFunc = (update) => {
      updateInternalFile(file.internalId, update);
    };

    handleProcessingStart();

    updateFile({
      state: IFileDropZoneFileState.Uploading,
      progress: undefined,
      canRetry: false,
    });

    try {
      await onRetry?.(file, updateFile);
    } catch (error) {
      updateFile((prevFile) => ({
        state: IFileDropZoneFileState.Error,
        errorTextList: [
          ...(prevFile.errorTextList ?? []),
          error instanceof Error ? error.message : String(error),
        ],
      }));
      onError?.(error, file, updateFile);
    } finally {
      handleProcessingEnd();
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
