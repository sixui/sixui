import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  FileDropZoneControl,
  IFileDropZoneControlOwnProps,
  IFileDropZoneControlProps,
} from './FileDropZoneControl';
import type {
  fileDropZoneControlTheme,
  IFileDropZoneControlThemeFactory,
} from './FileDropZoneControl/FileDropZoneControl.css';
import type { FileDropZoneFileCard } from './FileDropZoneFileCard';

export interface IFileDropZoneOwnProps
  extends IFileDropZoneControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'trailingAction'
      | 'supportingText'
      | 'trailingSupportingText'
      | 'requiredSign'
    > {
  labeledProps?: ILabeledProps;
  controlProps?: IFileDropZoneControlProps;
}

export interface IFileDropZoneProps
  extends IBoxProps,
    IComponentThemeProps<IFileDropZoneControlThemeFactory>,
    IFileDropZoneOwnProps {}

export type IFileDropZoneFactory = IComponentFactory<{
  props: IFileDropZoneProps;
  ref: HTMLInputElement;
  theme: typeof fileDropZoneControlTheme;
  staticComponents: {
    FileCard: typeof FileDropZoneFileCard;
    Control: typeof FileDropZoneControl;
  };
}>;
