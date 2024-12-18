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

  /**
   * Shows both the selected and deselected icons.
   */
  icons?: boolean;

  icon?: React.ReactNode;
  checkedIcon?: React.ReactNode;

  /**
   * Shows only the checked icon, and not the unchecked icon. If `true`,
   * overrides the behavior of the `icons` property.
   */
  showOnlyCheckedIcon?: boolean;

  loadingAnimation?: 'progressIndicator' | false;
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
