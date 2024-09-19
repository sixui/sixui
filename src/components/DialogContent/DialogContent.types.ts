import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  dialogContentTheme,
  IDialogContentThemeFactory,
} from './DialogContent.css';

export type IDialogActionsRenderProps = {
  close: () => IMaybeAsync<IAny>;
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
  onClose?: () => IMaybeAsync<IAny>;
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
