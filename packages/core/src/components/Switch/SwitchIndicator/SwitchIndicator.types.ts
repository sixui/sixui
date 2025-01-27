import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  basicTemplateTheme,
  ISwitchIndicatorThemeFactory,
} from './SwitchIndicator.css';

export interface ISwitchIndicatorOwnProps extends IPaperBaseOwnProps {
  checked?: boolean;
  loading?: boolean;
  disabled?: boolean;
  checkedIcon?: React.ReactNode | true;
  uncheckedIcon?: React.ReactNode | true;
  alwaysOn?: boolean;
  stateLayer?: React.ReactNode;
}

export interface ISwitchIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<ISwitchIndicatorThemeFactory>,
    ISwitchIndicatorOwnProps {}

export type ISwitchIndicatorFactory = IComponentFactory<{
  props: ISwitchIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof basicTemplateTheme;
}>;
