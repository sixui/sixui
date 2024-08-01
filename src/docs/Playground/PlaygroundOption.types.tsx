import type { IContainerProps } from '~/helpers/types';
import type { IPlaygroundOption } from './Playground.types';

export type IPlaygroundOptionProps<
  TSectionsProps extends Record<string, object>,
> = IContainerProps & {
  sectionsProps: TSectionsProps;
  option: IPlaygroundOption<TSectionsProps>;
  onChange: (option: IPlaygroundOption<TSectionsProps>) => void;
};
