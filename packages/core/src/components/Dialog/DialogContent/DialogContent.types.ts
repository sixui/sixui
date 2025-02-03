import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync, ISixuiSize } from '~/utils/types';
import type {
  dialogContentTheme,
  IDialogContentThemeFactory,
} from './DialogContent.css';

export type IDialogActionsRenderProps = {
  close: () => IMaybeAsync<unknown>;
};

export interface IDialogContentOwnProps extends IPaperOwnProps {
  type?: 'alert';
  scrollable?: boolean;
  icon?: React.ReactNode;
  headline: React.ReactNode;
  children?: React.ReactNode;
  actions:
    | React.ReactNode
    | ((props: IDialogActionsRenderProps) => React.ReactNode);
  onClose?: () => void;
  size?: ISixuiSize;
}

export interface IDialogContentProps
  extends IBoxProps,
    IComponentThemeProps<IDialogContentThemeFactory>,
    IDialogContentOwnProps {}

export type IDialogContentFactory = IPolymorphicComponentFactory<{
  props: IDialogContentProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof dialogContentTheme;
}>;
