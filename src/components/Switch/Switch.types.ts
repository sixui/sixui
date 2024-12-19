import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type { basicTemplateTheme, ISwitchThemeFactory } from './Switch.css';

export interface ISwitchOwnProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  checkedIcon?: React.ReactNode | true;
  uncheckedIcon?: React.ReactNode | true;
  alwaysOn?: boolean;
}

export interface ISwitchProps
  extends IBoxProps,
    IPaperBaseOwnProps,
    IComponentThemeProps<ISwitchThemeFactory>,
    ISwitchOwnProps {}

export type ISwitchFactory = IComponentFactory<{
  props: ISwitchProps;
  ref: HTMLDivElement;
  theme: typeof basicTemplateTheme;
}>;
