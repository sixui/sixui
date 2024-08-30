import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IBoxProps } from '../Box';
import type { paperBaseStyles, IPaperBaseStylesFactory } from './PaperBase.css';

export type IPaperBaseOwnProps = {
  children?: React.ReactNode;
};

export type IPaperBaseProps = IBoxProps &
  IStylesProps<IPaperBaseStylesFactory> &
  IPaperBaseOwnProps;

export type IPaperBaseFactory = IComponentFactory<{
  props: IPaperBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof paperBaseStyles;
}>;
