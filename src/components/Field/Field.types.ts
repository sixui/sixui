import type { IZeroOrMore, ICompiledStyles, IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IFieldBaseProps, IFieldBaseStylesKey } from '../FieldBase';
import type { IFieldStylesKey } from './Field.styles';

export type IFieldProps = IBaseProps<IFieldStylesKey> &
  IOmit<IFieldBaseProps, 'styles' | 'children' | 'forwardProps'> & {
    innerStyles?: {
      fieldBase?: IZeroOrMore<ICompiledStyles<IFieldBaseStylesKey>>;
    };
    placeholder?: string;
    children?: React.ReactNode;
  };
