import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type { basicTemplateTheme, ISwitchThemeFactory } from './Switch.css';
import { SwitchIndicator } from '../SwitchIndicator';

export interface ISwitchOwnProps extends IPaperBaseOwnProps {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  checkedIcon?: React.ReactNode | true;
  uncheckedIcon?: React.ReactNode | true;
  alwaysOn?: boolean;
  id?: string;
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
