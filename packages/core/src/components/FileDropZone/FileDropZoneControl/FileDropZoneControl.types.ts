import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IUseFileDropZoneProps } from '~/hooks/useFileDropZone';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  fileDropZoneControlTheme,
  IFileDropZoneControlThemeFactory,
} from './FileDropZoneControl.css';
import type { fileDropZoneControlStrings } from './FileDropZoneControl.strings';
import type { IImageSizeConstraints } from './utils/validateImageSize';

export type IFileDropZoneControlStrings = Record<
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

export interface IFileDropZoneControlOwnProps
  extends Pick<
    IUseFileDropZoneProps,
    | 'value'
    | 'defaultValue'
    | 'initializeFile'
    | 'onAccept'
    | 'onReject'
    | 'onError'
    | 'onDelete'
    | 'onReorder'
    | 'onRetry'
    | 'onSuccess'
    | 'onChange'
    | 'onProcessing'
  > {
  id?: string;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  hasError?: boolean;
  errorText?: React.ReactNode;
  capture?: 'user' | 'environment';
  required?: boolean;
  extraActions?: React.ReactNode;
  sortable?: boolean;
  getIconFromMimeType?: (mimeType?: string) => React.ReactNode;
  disabled?: boolean;
  strings?: typeof fileDropZoneControlStrings;
  rootRef?: React.RefObject<HTMLDivElement>;
  uploadIcon?: React.ReactNode;
  maxFileCount?: number;
  maxFileSize?: number;
  acceptedImageSize?: IImageSizeConstraints;
  retryIcon?: React.ReactNode;

  /**
   * See types option for more information. Keep in mind that mime type
   * determination is not reliable across platforms. CSV files, for example, are
   * reported as `text/plain` under macOS but as `application/vnd.ms-excel`
   * under Windows. In some cases there might not be a mime type set at all
   * (https://github.com/react-dropzone/react-dropzone/issues/276).
   *
   * @see
   * https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker
   */
  acceptedFileTypes?: Record<string, Array<string>>;
}

export interface IFileDropZoneControlProps
  extends IBoxProps,
    IComponentThemeProps<IFileDropZoneControlThemeFactory>,
    IFileDropZoneControlOwnProps {}

export type IFileDropZoneControlFactory = IComponentFactory<{
  props: IFileDropZoneControlProps;
  ref: HTMLInputElement;
  theme: typeof fileDropZoneControlTheme;
}>;
