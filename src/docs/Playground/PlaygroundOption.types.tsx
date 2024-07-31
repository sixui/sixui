import type { IContainerProps } from '~/helpers/types';
import type { IPlaygroundOption } from './Playground.types';

export type IPlaygroundOptionProps<TComponentProps extends object> =
  IContainerProps & {
    componentProps: TComponentProps;
    option: IPlaygroundOption<TComponentProps>;
    onChange: (option: IPlaygroundOption<TComponentProps>) => void;
  };
