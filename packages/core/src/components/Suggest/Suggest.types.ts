import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type { ISuggestThemeFactory, suggestTheme } from './Suggest.css';
import type {
  ISuggestControlOwnProps,
  ISuggestControlProps,
  SuggestControl,
} from './SuggestControl';

export interface ISuggestOwnProps
  extends ISuggestControlOwnProps,
    IOmit<ILabeledOwnProps, 'children'> {
  labeledProps?: Partial<ILabeledProps>;
  controlProps?: Partial<ISuggestControlProps>;
  skeleton?: boolean;
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
