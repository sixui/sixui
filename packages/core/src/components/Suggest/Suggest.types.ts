import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISuggestThemeFactory, suggestTheme } from './Suggest.css';
import type {
  ISuggestControlOwnProps,
  ISuggestControlProps,
  SuggestControl,
} from './SuggestControl';

export interface ISuggestOwnProps
  extends ISuggestControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'supportingText'
      | 'requiredSign'
      | 'hasError'
      | 'errorText'
      | 'loading'
      | 'readOnlyOnLoading'
    > {
  labeledProps?: ILabeledProps;
  controlProps?: ISuggestControlProps;
}

export interface ISuggestProps
  extends IBoxProps,
    IComponentThemeProps<ISuggestThemeFactory>,
    ISuggestOwnProps {}

export type ISuggestFactory = IComponentFactory<{
  props: ISuggestProps;
  ref: HTMLDivElement;
  theme: typeof suggestTheme;
  staticComponents: {
    Control: typeof SuggestControl;
  };
}>;
