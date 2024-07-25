import type { IContainerProps } from '@/helpers/types';
import type { IPlaygroundOptionsStylesKey } from './PlaygroundOptions.styles';
import type { IPlaygroundOptions } from './Playground.types';

export type IPlaygroundOptionsProps<TComponentProps> =
  IContainerProps<IPlaygroundOptionsStylesKey> & {
    options: IPlaygroundOptions;
    onComponentPropsChange?: (values: TComponentProps) => void;
  };
