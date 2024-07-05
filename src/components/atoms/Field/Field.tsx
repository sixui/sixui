import { forwardRef, useMemo } from 'react';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IOmit,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IFieldStyleKey } from './Field.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  FieldBase,
  fieldBaseDefaultTag,
  type IFieldBaseStyleKey,
  type IFieldBaseOwnProps,
} from '@/components/atoms/FieldBase';

const fieldDefaultTag = fieldBaseDefaultTag;

export type IFieldOwnProps = IContainerProps<IFieldStyleKey> &
  IOmit<IFieldBaseOwnProps, 'styles' | 'children' | 'forwardProps'> & {
    innerStyles?: {
      fieldBase?: IZeroOrMore<ICompiledStyles<IFieldBaseStyleKey>>;
    };
    placeholder?: string;
    children?: React.ReactNode;
  };

export type IFieldProps<
  TRoot extends React.ElementType = typeof fieldDefaultTag,
> = IPolymorphicComponentPropsWithRef<TRoot, IFieldOwnProps>;

type IField = <TRoot extends React.ElementType = typeof fieldDefaultTag>(
  props: IFieldProps<TRoot>,
) => React.ReactNode;

export const Field: IField = forwardRef(function Field<
  TRoot extends React.ElementType = typeof fieldDefaultTag,
>(props: IFieldProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    innerStyles,
    populated: populatedProp,
    placeholder,
    children,
    ...other
  } = props as IWithAsProp<IFieldOwnProps>;

  const { theme } = useComponentTheme('Field');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory<IFieldStyleKey>(stylesCombinator),
    [stylesCombinator],
  );

  const populated = populatedProp ?? (!!children || !!placeholder);

  return (
    <FieldBase
      styles={innerStyles?.fieldBase}
      ref={forwardedRef}
      populated={populated}
      {...other}
    >
      {children ? (
        <div {...sxf('value')} data-cy='value'>
          {children}
        </div>
      ) : placeholder ? (
        <div
          {...sxf('placeholder', other.disabled && 'placeholder$disabled')}
          data-cy='placeholder'
        >
          {placeholder}
        </div>
      ) : null}
    </FieldBase>
  );
});
