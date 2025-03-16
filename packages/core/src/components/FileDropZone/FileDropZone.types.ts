import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  fileDropZoneTheme,
  IFileDropZoneThemeFactory,
} from './FileDropZone.css';
import type {
  FileDropZoneControl,
  IFileDropZoneControlOwnProps,
  IFileDropZoneControlProps,
} from './FileDropZoneControl';
import type { FileDropZoneFileCard } from './FileDropZoneFileCard';

export interface IFileDropZoneOwnProps
  extends IFileDropZoneControlOwnProps,
    IOmit<ILabeledOwnProps, 'children'> {
  labeledProps?: ILabeledProps;
  controlProps?: IFileDropZoneControlProps;
}

export interface IFileDropZoneProps
  extends IBoxProps,
    IComponentThemeProps<IFileDropZoneThemeFactory>,
    IFileDropZoneOwnProps {}

export type IFileDropZoneFactory = IComponentFactory<{
  props: IFileDropZoneProps;
  ref: HTMLInputElement;
  theme: typeof fileDropZoneTheme;
  staticComponents: {
    FileCard: typeof FileDropZoneFileCard;
    Control: typeof FileDropZoneControl;
  };
}>;
