import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IElementWithLabelStyleKey,
  IElementWithLabelStyleVarKey,
} from './ElementWithLabel.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useId } from '@/hooks/useId';

type IElementWithLabelRenderPropsArg = {
  id: string;
};

export type IElementWithLabelProps =
  IContainerProps<IElementWithLabelStyleKey> & {
    id?: string;
    label: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    supportingText?: React.ReactNode;
    errorText?: React.ReactNode;
    children:
      | React.ReactNode
      | ((props: IElementWithLabelRenderPropsArg) => React.ReactNode);
    hasError?: boolean;
    labelPosition?: 'top' | 'end';
  };

export const ElementWithLabel = forwardRef<
  HTMLDivElement,
  IElementWithLabelProps
>(function ElementWithLabel(props, ref) {
  const {
    styles,
    sx,
    id: idProp,
    label,
    required,
    supportingText,
    errorText,
    children,
    hasError,
    labelPosition = 'top',
    ...other
  } = props;

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

  const renderLabel = (): React.ReactElement => (
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
  );

  return (
    <div
      {...sxf(
        labelPosition === 'top' ? 'host$labelTop' : 'host$labelEnd',
        theme.vars,
        sx,
      )}
      ref={ref}
    >
      {labelPosition === 'top' ? renderLabel() : null}
      <div {...sxf('element')}>
        {typeof children === 'function' ? children({ id }) : children || null}
      </div>
      {labelPosition === 'end' ? renderLabel() : null}
    </div>
  );
});
