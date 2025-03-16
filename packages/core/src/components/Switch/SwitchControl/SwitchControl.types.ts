import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IUseSwitchProps } from '~/hooks/useSwitch';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  basicTemplateTheme,
  ISwitchControlThemeFactory,
} from './SwitchControl.css';

export interface ISwitchControlOwnProps extends IUseSwitchProps {
  checkedIcon?: React.ReactNode | true;
  uncheckedIcon?: React.ReactNode | true;
  rootRef?: React.Ref<HTMLDivElement>;
  hasError?: boolean;
}

export interface ISwitchControlProps
  extends IBoxProps,
    IComponentThemeProps<ISwitchControlThemeFactory>,
    ISwitchControlOwnProps {}

export type ISwitchControlFactory = IComponentFactory<{
  props: ISwitchControlProps;
  ref: HTMLInputElement;
  theme: typeof basicTemplateTheme;
}>;
