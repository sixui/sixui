import type { IFileDropZoneInputFile } from '~/hooks/useFileDropZone';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type { IFileDropZoneControlProps } from '../FileDropZoneControl.types';
import {
  IFileDropZoneFile,
  IFileDropZoneFileState,
} from '~/hooks/useFileDropZone';
import { FileDropZoneControl } from '../FileDropZoneControl';

export interface IFileUploaderDemoProgressEvent {
  progress: number;
}

export interface IFileUploaderDemoProps
  extends IOmit<IFileDropZoneControlProps, 'onAccept'> {
  generateUploadUrl: (file: IFileDropZoneFile) => IMaybeAsync<string>;
  upload: (
    file: IFileDropZoneFile,
    uploadUrl: string,
    progressEvent: (event: IFileUploaderDemoProgressEvent) => void,
  ) => IMaybeAsync<void>;
  register?: (file: IFileDropZoneFile) => IMaybeAsync<IFileDropZoneInputFile>;
  allowRetryOnError?: boolean;
}

export const FileUploaderDemo: React.FC<IFileUploaderDemoProps> = (props) => {
  const {
    generateUploadUrl,
    upload,
    register,
    onError,
    allowRetryOnError,
    ...other
  } = props;

  const handleAccept: IFileDropZoneControlProps['onAccept'] = async (
    file,
    updateInternalFile,
  ) => {
    const uploadUrl = await generateUploadUrl(file);
    await upload(file, uploadUrl, (event) => {
      updateInternalFile({
        state: IFileDropZoneFileState.Uploading,
        progress: event.progress,
      });
    });

    updateInternalFile({
      state: IFileDropZoneFileState.Uploading,
      progress: undefined,
    });

    await register?.(file);
  };

  const handleError: IFileDropZoneControlProps['onError'] = (
    error,
    file,
    updateFile,
  ) => {
    if (allowRetryOnError) {
      updateFile?.({
        canRetry: true,
      });
    }

    onError?.(error, file);
  };

  const handleRetry: IFileDropZoneControlProps['onRetry'] = (
    file,
    updateFile,
  ) => handleAccept(file, updateFile);

  return (
    <FileDropZoneControl
      onAccept={handleAccept}
      onError={handleError}
      onRetry={handleRetry}
      {...other}
    />
  );
};
