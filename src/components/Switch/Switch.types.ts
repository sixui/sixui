import type { IOmit } from '~/helpers/types';
import type { IUseSwitchProps } from '~/hooks/useSwitch';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type { SwitchIndicator } from '../SwitchIndicator';
import type { basicTemplateTheme, ISwitchThemeFactory } from './Switch.css';

export interface ISwitchOwnProps
  extends IOmit<IUseSwitchProps, 'componentName'>,
    IPaperBaseOwnProps {
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
