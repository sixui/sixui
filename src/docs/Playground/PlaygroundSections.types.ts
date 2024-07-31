import type { IContainerProps } from '~/helpers/types';
import type { IPlaygroundSections } from './Playground.types';

export type IPlaygroundSectionsProps<TComponentProps extends object> =
  IContainerProps & {
    sections: IPlaygroundSections<TComponentProps>;
    onSectionsChange: (sections: IPlaygroundSections<TComponentProps>) => void;
    componentProps: TComponentProps;
  };
