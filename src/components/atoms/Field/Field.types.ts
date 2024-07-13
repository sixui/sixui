import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IFieldStyleKey } from './Field.styles';
import {
  FIELD_BASE_DEFAULT_TAG,
  type IFieldBaseStyleKey,
  type IFieldBaseOwnProps,
} from '@/components/atoms/FieldBase';

export const FIELD_DEFAULT_TAG = FIELD_BASE_DEFAULT_TAG;

export type IFieldOwnProps = IContainerProps<IFieldStyleKey> &
  IOmit<IFieldBaseOwnProps, 'styles' | 'children' | 'forwardProps'> & {
    innerStyles?: {
      fieldBase?: IZeroOrMore<ICompiledStyles<IFieldBaseStyleKey>>;
    };
    placeholder?: string;
    children?: React.ReactNode;
  };

export type IFieldProps<
  TRoot extends React.ElementType = typeof FIELD_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IFieldOwnProps>;
