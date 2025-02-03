import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IRadioIndicatorThemeFactory,
  RadioIndicatorTheme,
} from './RadioIndicator.css';

export interface IRadioIndicatorOwnProps extends IPaperBaseOwnProps {
  checked?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface IRadioIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IRadioIndicatorThemeFactory>,
    IRadioIndicatorOwnProps {}

export type IRadioIndicatorFactory = IComponentFactory<{
  props: IRadioIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof RadioIndicatorTheme;
}>;
