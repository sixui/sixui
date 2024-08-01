import type { IContainerProps } from '~/helpers/types';
import type { IPlaygroundOption } from './Playground.types';

export type IPlaygroundOptionProps<
  TSectionsProps extends Record<string, object>,
  TSectionKey extends keyof TSectionsProps = keyof TSectionsProps,
> = IContainerProps & {
  sectionsProps: TSectionsProps;
  option: IPlaygroundOption<TSectionsProps, TSectionKey>;
  onChange: (option: IPlaygroundOption<TSectionsProps, TSectionKey>) => void;
};
