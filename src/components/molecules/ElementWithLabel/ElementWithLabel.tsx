import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  IElementWithLabelStyleKey,
  IElementWithLabelStyleVarKey,
} from './ElementWithLabel.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useId } from '@/hooks/useId';

const DEFAULT_TAG = 'div';

export type IElementWithLabelOwnProps =
  IContainerProps<IElementWithLabelStyleKey> & {
    id?: string;
    label: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    supportingText?: React.ReactNode;
    errorText?: React.ReactNode;
    hasError?: boolean;
  };

export type IElementWithLabelProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IElementWithLabelOwnProps>;

type IElementWithLabel = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IElementWithLabelProps<TRoot>,
) => React.ReactNode;

export const ElementWithLabel: IElementWithLabel = forwardRef(
  function ElementWithLabel<
    TRoot extends React.ElementType = typeof DEFAULT_TAG,
  >(props: IElementWithLabelProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
    const {
      as: Component = DEFAULT_TAG,
      styles,
      sx,
      id: idProp,
      label,
      required,
      supportingText,
      errorText,
      hasError,
      ...other
    } = props as IWithAsProp<IElementWithLabelOwnProps>;

    const { theme } = useComponentTheme('ElementWithLabel');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<
          IElementWithLabelStyleKey,
          IElementWithLabelStyleVarKey
        >(stylesCombinator),
      [stylesCombinator],
    );

    const id = useId(idProp);
    const supportingOrErrorText =
      hasError && errorText ? errorText : supportingText;

    return (
      <div {...sxf('host', theme.vars, sx)}>
        <div {...sxf('element')}>
          <Component ref={ref} {...other} id={id} />
        </div>
        <div>
          <label
            {...sxf(
              'labelText',
              other.disabled
                ? 'labelText$disabled'
                : hasError && !errorText && 'labelText$error',
            )}
            htmlFor={id}
          >
            {label}
            {required ? '*' : null}
          </label>
          {supportingOrErrorText !== undefined ? (
            <div
              {...sxf(
                'supportingText',
                other.disabled
                  ? 'supportingText$disabled'
                  : hasError && 'supportingText$error',
              )}
            >
              {supportingOrErrorText}
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);
