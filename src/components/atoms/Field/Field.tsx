import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  FIELD_DEFAULT_TAG,
  IFieldOwnProps,
  IFieldProps,
} from './Field.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { FieldBase } from '@/components/atoms/FieldBase';
import { fieldStyles } from './Field.styles';

type IField = <TRoot extends React.ElementType = typeof FIELD_DEFAULT_TAG>(
  props: IFieldProps<TRoot>,
) => React.ReactNode;

export const Field: IField = forwardRef(function Field<
  TRoot extends React.ElementType = typeof FIELD_DEFAULT_TAG,
>(props: IFieldProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    innerStyles,
    populated: populatedProp,
    placeholder,
    children,
    ...other
  } = props as IWithAsProp<IFieldOwnProps>;

  const { overridenStyles } = useComponentTheme('Field');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(fieldStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const populated = populatedProp ?? (!!children || !!placeholder);

  return (
    <FieldBase
      sx={[overridenStyles, sx]}
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
