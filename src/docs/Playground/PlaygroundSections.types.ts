import type { IBaseProps } from '~/components/Base';
import type { IPlaygroundSections } from './Playground.types';

export type IPlaygroundSectionsProps<
  TSectionsProps extends Record<string, object>,
> = IBaseProps & {
  sections: IPlaygroundSections<TSectionsProps>;
  onSectionsChange: (sections: IPlaygroundSections<TSectionsProps>) => void;
  sectionsProps: TSectionsProps;
};
