import type { IOmit } from '~/utils/types';
import type {
  IFileDropZoneFileInfo,
  IFileDropZoneProps,
} from '../FileDropZone.types';
import { FileDropZone } from '../FileDropZone';
import {
  IUseFileDropZoneDemoResult,
  useFileDropZoneDemo,
} from './useFileDropZoneDemo';

export type IFileDropZoneDemoChildrenRenderProps = IUseFileDropZoneDemoResult;

export type IFileDropZoneDemoProps = IOmit<
  IFileDropZoneProps,
  'files' | 'children'
> & {
  initialFiles?: Array<IFileDropZoneFileInfo>;
  children: (props: IFileDropZoneDemoChildrenRenderProps) => React.ReactNode;
};

export const FileDropZoneDemo: React.FC<IFileDropZoneDemoProps> = (props) => {
  const { initialFiles, onAccept, onReject, children, ...other } = props;
  const fileDropZoneDemo = useFileDropZoneDemo({
    initialFiles,
    onAccept,
    onReject,
  });

  return (
    <FileDropZone
      onAccept={fileDropZoneDemo.handleAccept}
      onReject={fileDropZoneDemo.handleReject}
      files={fileDropZoneDemo.files}
      {...other}
    >
      {children(fileDropZoneDemo)}
    </FileDropZone>
  );
};
