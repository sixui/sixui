import type { IBaseProps } from '~/components/Base';
import type { IPlaygroundOption } from './Playground.types';

export type IPlaygroundOptionProps<
  TSectionsProps extends Record<string, object>,
  TSectionKey extends keyof TSectionsProps = keyof TSectionsProps,
> = IBaseProps & {
  option: IPlaygroundOption<TSectionsProps, TSectionKey>;
  onChange: (option: IPlaygroundOption<TSectionsProps, TSectionKey>) => void;
  sectionKey: TSectionKey;
  sectionsProps: TSectionsProps;
};
