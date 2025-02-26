import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type { dropZoneTheme, IDropZoneThemeFactory } from './DropZone.css';

export type IDropZoneRenderProps = {
  dropping?: boolean;
};

export interface IDropZoneOwnProps extends IOmit<IPaperOwnProps, 'children'> {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  children?:
    | React.ReactNode
    | ((props: IDropZoneRenderProps) => React.ReactNode);
  disabled?: boolean;
  dropping?: boolean;
  onClick?: () => IMaybeAsync<unknown>;
}

export interface IDropZoneProps
  extends IBoxProps,
    IComponentThemeProps<IDropZoneThemeFactory>,
    IDropZoneOwnProps {}

export type IDropZoneFactory = IComponentFactory<{
  props: IDropZoneProps;
  ref: HTMLButtonElement;
  theme: typeof dropZoneTheme;
}>;
