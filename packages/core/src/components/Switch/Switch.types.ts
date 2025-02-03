import type { IBoxProps } from '~/components/Box';
import type { IPaperBaseOwnProps } from '~/components/PaperBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IUseSwitchProps } from '~/hooks/useSwitch';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { basicTemplateTheme, ISwitchThemeFactory } from './Switch.css';
import type { SwitchIndicator } from './SwitchIndicator';

export interface ISwitchOwnProps extends IUseSwitchProps, IPaperBaseOwnProps {
  checkedIcon?: React.ReactNode | true;
  uncheckedIcon?: React.ReactNode | true;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface ISwitchProps
  extends IBoxProps,
    IComponentThemeProps<ISwitchThemeFactory>,
    ISwitchOwnProps {}

export type ISwitchFactory = IComponentFactory<{
  props: ISwitchProps;
  ref: HTMLInputElement;
  theme: typeof basicTemplateTheme;
  staticComponents: {
    Indicator: typeof SwitchIndicator;
  };
}>;
