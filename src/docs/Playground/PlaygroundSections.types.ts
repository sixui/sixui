import type { IContainerProps } from '~/helpers/types';
import type { IPlaygroundSections } from './Playground.types';

export type IPlaygroundSectionsProps<
  TSectionsProps extends Record<string, object>,
> = IContainerProps & {
  sections: IPlaygroundSections<TSectionsProps>;
  onSectionsChange: (sections: IPlaygroundSections<TSectionsProps>) => void;
  sectionsProps: TSectionsProps;
};
