import { forwardRef, useMemo } from 'react';
import { isFunction } from 'lodash';

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
  IOmit<IFieldBaseOwnProps, 'styles'> & {
    innerStyles?: {
      field?: IZeroOrMore<ICompiledStyles<IFieldBaseStyleKey>>;
    };
    placeholder?: string;
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
    sx,
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
      sx={sx}
      ref={forwardedRef}
      populated={populated}
      {...(props.forwardRest ? undefined : other)}
    >
      {children ? (
        <div {...sxf('value')} data-cy='value'>
          {isFunction(children)
            ? children({
                rest: props.forwardRest ? other : undefined,
              })
            : children}
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
