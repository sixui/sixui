import type { IBoxProps } from '~/components/Box';
import type { IFileCardOwnProps } from '~/components/FileCard';
import type {
  fileCardTheme,
  IFileCardThemeFactory,
} from '~/components/FileCard/FileCard.css';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IFileDropZoneFile } from '~/hooks/useFileDropZone';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync, IOmit } from '~/utils/types';

export interface IFileDropZoneFileCardOwnProps
  extends IOmit<IFileCardOwnProps, 'onDelete'> {
  file: IFileDropZoneFile;
  onDelete?: (file: IFileDropZoneFile) => IMaybeAsync<unknown>;
  downloadIcon?: React.ReactNode;
}

export interface IFileDropZoneFileCardProps
  extends IBoxProps,
    IComponentThemeProps<IFileCardThemeFactory>,
    IFileDropZoneFileCardOwnProps {}

export type IFileDropZoneFileCardFactory = IComponentFactory<{
  props: IFileDropZoneFileCardProps;
  ref: HTMLDivElement;
  theme: typeof fileCardTheme;
}>;
