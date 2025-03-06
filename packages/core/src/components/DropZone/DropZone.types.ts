import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync } from '~/utils/types';
import type { dropZoneTheme, IDropZoneThemeFactory } from './DropZone.css';

export type IDropZoneChildrenRenderProps = {
  dropping?: boolean;
  hasError?: boolean;
};

export interface IDropZoneOwnProps {
  label?: React.ReactNode;
  actionIcon?: React.ReactNode;
  actionLabel?: React.ReactNode;
  children?:
    | React.ReactNode
    | ((props: IDropZoneChildrenRenderProps) => React.ReactNode);
  disabled?: boolean;
  dropping?: boolean;
  onClick?: () => IMaybeAsync<unknown>;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  hasError?: boolean;
  errorText?: React.ReactNode;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IDropZoneProps
  extends IBoxProps,
    IComponentThemeProps<IDropZoneThemeFactory>,
    IDropZoneOwnProps {}

export type IDropZoneFactory = IComponentFactory<{
  props: IDropZoneProps;
  ref: HTMLDivElement;
  theme: typeof dropZoneTheme;
}>;
