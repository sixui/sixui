import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IFieldStyleKey } from './Field.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { FieldBase } from '@/components/atoms/FieldBase';
import {
  FIELD_DEFAULT_TAG,
  type IFieldOwnProps,
  type IFieldProps,
} from './FieldProps';

type IField = <TRoot extends React.ElementType = typeof FIELD_DEFAULT_TAG>(
  props: IFieldProps<TRoot>,
) => React.ReactNode;

export const Field: IField = forwardRef(function Field<
  TRoot extends React.ElementType = typeof FIELD_DEFAULT_TAG,
>(props: IFieldProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    innerStyles,
    populated: populatedProp,
    placeholder,
    children,
    ...other
  } = props as IWithAsProp<IFieldOwnProps>;

  const { theme } = useComponentThemeOld('Field');
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
