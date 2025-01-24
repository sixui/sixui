import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  ITouchTargetThemeFactory,
  touchTargetTheme,
} from './TouchTarget.css';

export interface ITouchTargetOwnProps {
  children?: React.ReactNode;
}

export interface ITouchTargetProps
  extends IBoxProps,
    IComponentThemeProps<ITouchTargetThemeFactory>,
    ITouchTargetOwnProps {}

export type ITouchTargetFactory = IComponentFactory<{
  props: ITouchTargetProps;
  ref: HTMLDivElement;
  theme: typeof touchTargetTheme;
}>;
