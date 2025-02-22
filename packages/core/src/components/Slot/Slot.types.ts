import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { ISlotThemeFactory, slotTheme } from './Slot.css';
import { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';

export interface ISlotOwnProps {
  children?: React.ReactNode;
  hidden?: boolean;
  loading?: boolean;
  loadingOverlay?: React.ReactNode;
  animated?: boolean;
}

export interface ISlotProps
  extends IBoxProps,
    IComponentThemeProps<ISlotThemeFactory>,
    ISlotOwnProps {}

export type ISlotFactory = IPolymorphicComponentFactory<{
  props: ISlotProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof slotTheme;
}>;
