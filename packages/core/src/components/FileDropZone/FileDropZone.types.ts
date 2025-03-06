import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync } from '~/utils/types';
import type {
  fileDropZoneTheme,
  IFileDropZoneThemeFactory,
} from './FileDropZone.css';
import type { fileDropZoneStrings } from './FileDropZone.strings';
import type { IImageSizeConstraints } from './utils/validateImageSize';
import { FileDropZoneFileCards } from './FileDropZoneFileCards';

export type IFileDropZoneFileInfo = {
  key: string;
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
};

export type IFileDropZonePartialFileInfo = Partial<IFileDropZoneFileInfo>;

export type IFileDropZoneStrings = Record<
  | 'dragSingle'
  | 'dragMultiple'
  | 'browse'
  | 'fileInvalidType'
  | 'fileTooLarge'
  | 'fileTooSmall'
  | 'invalidImageSize'
  | 'tooManyFiles'
  | 'unknownError',
  string
>;

export interface IFileDropZoneChildrenRenderProps {
  files: Array<IFileDropZonePartialFileInfo>;
}

export interface IFileDropZoneOwnProps {
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  hasError?: boolean;
  errorText?: React.ReactNode;
  files?: Array<IFileDropZonePartialFileInfo>;
  capture?: 'user' | 'environment';
  extraActions?: React.ReactNode;
  onAccept?: (fileInfo: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  onReject?: (fileInfo: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;

  disabled?: boolean;
  strings?: typeof fileDropZoneStrings;
  rootRef?: React.RefObject<HTMLDivElement>;
  uploadIcon?: React.ReactNode;
  maxFileCount?: number;
  maxFileSize?: number;
  acceptedImageSize?: IImageSizeConstraints;
  children: (props: IFileDropZoneChildrenRenderProps) => React.ReactNode;

  /**
   * See types option for more information. Keep in mind that mime type
   * determination is not reliable across platforms. CSV files, for example, are
   * reported as `text/plain` under macOS but as `application/vnd.ms-excel` under
   * Windows. In some cases there might not be a mime type set at all
   * (https://github.com/react-dropzone/react-dropzone/issues/276).
   *
   * @see
   * https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker
   */
  acceptedFileTypes?: Record<string, Array<string>>;
}

export interface IFileDropZoneProps
  extends IBoxProps,
    IComponentThemeProps<IFileDropZoneThemeFactory>,
    IFileDropZoneOwnProps {}

export type IFileDropZoneFactory = IComponentFactory<{
  props: IFileDropZoneProps;
  ref: HTMLDivElement;
  theme: typeof fileDropZoneTheme;
  staticComponents: {
    FileCards: typeof FileDropZoneFileCards;
  };
}>;
