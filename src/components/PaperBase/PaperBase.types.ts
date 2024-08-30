import type { IComponentFactory } from '~/utils/componentFactory';
import type { IStylesProps } from '~/hooks/useStyles2';
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
