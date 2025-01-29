import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { ISlotThemeFactory, slotTheme } from './Slot.css';

export interface ISlotOwnProps {
  children?: React.ReactNode;
  opened?: boolean;
  loading?: boolean;
  loadingOverlay?: React.ReactNode;
  animated?: boolean;
}

export interface ISlotProps
  extends IBoxProps,
    IComponentThemeProps<ISlotThemeFactory>,
    ISlotOwnProps {}

export type ISlotFactory = IComponentFactory<{
  props: ISlotProps;
  ref: HTMLDivElement;
  theme: typeof slotTheme;
}>;
