import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type {
  IFileDropZoneFile,
  IUseFileDropZoneProps,
} from '~/hooks/useFileDropZone';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  fileDropZoneTheme,
  IFileDropZoneThemeFactory,
} from './FileDropZone.css';
import type { fileDropZoneStrings } from './FileDropZone.strings';
import type { FileDropZoneFileCard } from './FileDropZoneFileCard';
import type { IImageSizeConstraints } from './utils/validateImageSize';

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

export interface IFileDropZoneOwnProps {
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  hasError?: boolean;
  errorText?: React.ReactNode;
  initialFiles?: Array<IFileDropZoneFile>;
  capture?: 'user' | 'environment';
  extraActions?: React.ReactNode;
  sortable?: boolean;
  onAccept?: IUseFileDropZoneProps['onAccept'];
  onReject?: IUseFileDropZoneProps['onReject'];
  onError?: IUseFileDropZoneProps['onError'];
  onDelete?: IUseFileDropZoneProps['onDelete'];
  onReorder?: IUseFileDropZoneProps['onReorder'];
  onRetry?: IUseFileDropZoneProps['onRetry'];
  onChange?: IUseFileDropZoneProps['onChange'];
  getIconFromMimeType: (mimeType?: string) => React.ReactNode;
  disabled?: boolean;
  strings?: typeof fileDropZoneStrings;
  rootRef?: React.RefObject<HTMLDivElement>;
  uploadIcon?: React.ReactNode;
  maxFileCount?: number;
  maxFileSize?: number;
  acceptedImageSize?: IImageSizeConstraints;
  retryIcon?: React.ReactNode;

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
    FileCard: typeof FileDropZoneFileCard;
  };
}>;
