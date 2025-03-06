import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync } from '~/utils/types';
import type { IFileDropZonePartialFileInfo } from '../FileDropZone.types';
import type {
  fileDropZoneFileCardsTheme,
  IFileDropZoneFileCardsThemeFactory,
} from './FileDropZoneFileCards.css';

export interface IFileDropZoneFileCardsOwnProps {
  files: Array<IFileDropZonePartialFileInfo>;
  onDelete?: (fileInfo: IFileDropZonePartialFileInfo) => IMaybeAsync<unknown>;
  downloadIcon?: React.ReactNode;
  hideMetadata?: boolean;
  fileIconRenderer?: (mimeType?: string) => React.ReactNode;
}

export interface IFileDropZoneFileCardsProps
  extends IBoxProps,
    IComponentThemeProps<IFileDropZoneFileCardsThemeFactory>,
    IFileDropZoneFileCardsOwnProps {}

export type IFileDropZoneFileCardsFactory = IComponentFactory<{
  props: IFileDropZoneFileCardsProps;
  ref: HTMLDivElement;
  theme: typeof fileDropZoneFileCardsTheme;
}>;
