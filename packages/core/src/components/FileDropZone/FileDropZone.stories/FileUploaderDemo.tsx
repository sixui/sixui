import type { IFileDropZoneFile } from '~/hooks/useFileDropZone';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type { IFileDropZoneProps } from '../FileDropZone.types';
import { FileDropZone } from '../FileDropZone';

export interface IFileUploaderDemoProgressEvent {
  progress: number;
}

export interface IFileUploaderDemoProps
  extends IOmit<IFileDropZoneProps, 'onAccept'> {
  generateUploadUrl: (file: IFileDropZoneFile) => IMaybeAsync<string>;
  upload: (
    file: IFileDropZoneFile,
    uploadUrl: string,
    progressEvent: (event: IFileUploaderDemoProgressEvent) => void,
  ) => IMaybeAsync<void>;
  register?: (file: IFileDropZoneFile) => IMaybeAsync<void>;
  onSuccess?: (file: IFileDropZoneFile) => IMaybeAsync<void>;
  allowRetryOnError?: boolean;
}

export const FileUploaderDemo: React.FC<IFileUploaderDemoProps> = (props) => {
  const {
    generateUploadUrl,
    upload,
    register,
    onSuccess,
    onError,
    allowRetryOnError,
    ...other
  } = props;

  const handleAccept: IFileDropZoneProps['onAccept'] = async (
    file,
    updateFile,
  ) => {
    updateFile({
      loading: true,
      progress: undefined,
      canRetry: false,
    });

    const uploadUrl = await generateUploadUrl(file);
    await upload(file, uploadUrl, (event) => {
      updateFile({
        progress: event.progress,
      });
    });

    updateFile({
      loading: true,
      progress: undefined,
    });

    await register?.(file);

    updateFile({
      loading: false,
      progress: undefined,
    });

    await onSuccess?.(file);
  };

  const handleError: IFileDropZoneProps['onError'] = async (
    error,
    file,
    updateFile,
  ) => {
    if (allowRetryOnError) {
      updateFile?.({
        canRetry: true,
      });
    }

    await onError?.(error, file);
  };

  const handleRetry: IFileDropZoneProps['onRetry'] = (file, updateFile) =>
    handleAccept(file, updateFile);

  return (
    <FileDropZone
      onAccept={handleAccept}
      onError={handleError}
      onRetry={handleRetry}
      {...other}
    />
  );
};
