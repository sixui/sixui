import type { IBoxProps } from '~/components/Box';
import type { IFileCardOwnProps } from '~/components/FileCard';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IFileDropZoneFileInfo } from '~/hooks/useFileDropZone';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type {
  fileDropZoneFileCardTheme,
  IFileDropZoneFileCardThemeFactory,
} from './FileDropZoneFileCard.css';

export interface IFileDropZoneFileCardOwnProps
  extends IOmit<IFileCardOwnProps, 'onDelete'> {
  file: IFileDropZoneFileInfo;
  onDelete?: (fileInfo: IFileDropZoneFileInfo) => IMaybeAsync<unknown>;
  downloadIcon?: React.ReactNode;
}

export interface IFileDropZoneFileCardProps
  extends IBoxProps,
    IComponentThemeProps<IFileDropZoneFileCardThemeFactory>,
    IFileDropZoneFileCardOwnProps {}

export type IFileDropZoneFileCardFactory = IComponentFactory<{
  props: IFileDropZoneFileCardProps;
  ref: HTMLDivElement;
  theme: typeof fileDropZoneFileCardTheme;
}>;
