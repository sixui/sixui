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

export type IElementWithLabelRenderProps = {
  id: string;
  required?: boolean;
  disabled?: boolean;
  hasError?: boolean;
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
      | ((props: IElementWithLabelRenderProps) => React.ReactNode);
    hasError?: boolean;
    orientation?: 'vertical' | 'horizontal';
    labelPosition?: 'start' | 'end';
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
    disabled,
    supportingText,
    errorText,
    children,
    hasError,
    orientation = 'vertical',
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
      {label !== undefined ? (
        <label
          {...sxf(
            'labelText',
            disabled
              ? 'labelText$disabled'
              : hasError && !errorText && 'labelText$error',
          )}
          htmlFor={id}
        >
          {label}
          {required ? '*' : null}
        </label>
      ) : null}
      {supportingOrErrorText !== undefined ? (
        <div
          {...sxf(
            'supportingText',
            disabled
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
        orientation === 'horizontal'
          ? [
              'host$horizontal',
              labelPosition === 'start'
                ? 'host$horizontal$labelPositionStart'
                : 'host$horizontal$labelPositionEnd',
            ]
          : 'host$vertical',
        theme.vars,
        sx,
      )}
      ref={ref}
      {...other}
    >
      {labelPosition === 'start' ? renderLabel() : null}
      <div {...sxf('element')}>
        {typeof children === 'function'
          ? children({ id, required, disabled })
          : children || null}
      </div>
      {labelPosition === 'end' ? renderLabel() : null}
    </div>
  );
});
