import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  touchTargetTheme,
  ITouchTargetThemeFactory,
} from './TouchTarget.css';

export type ITouchTargetOwnProps = {
  children?: React.ReactNode;
};

export interface ITouchTargetProps
  extends IBoxProps,
    IStylesProps<ITouchTargetThemeFactory>,
    ITouchTargetOwnProps {}

export type ITouchTargetFactory = IComponentFactory<{
  props: ITouchTargetProps;
  ref: HTMLDivElement;
  theme: typeof touchTargetTheme;
}>;
