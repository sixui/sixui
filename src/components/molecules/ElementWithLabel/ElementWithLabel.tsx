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
  readOnly?: boolean;
  hasError?: boolean;
};

export type IElementWithLabelProps =
  IContainerProps<IElementWithLabelStyleKey> & {
    id?: string;
    label?: React.ReactNode;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    supportingText?: React.ReactNode;
    errorText?: React.ReactNode;
    children:
      | React.ReactNode
      | ((props: IElementWithLabelRenderProps) => React.ReactNode);
    hasError?: boolean;
    orientation?: 'vertical' | 'horizontal';
    labelPosition?: 'start' | 'end';
    supportingTextPosition?: 'start' | 'end';
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
    readOnly,
    supportingText,
    errorText,
    children,
    hasError,
    orientation = 'vertical',
    labelPosition = orientation === 'vertical' ? 'start' : 'end',
    supportingTextPosition: supportingTextPositionProp,
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
  const supportingTextPosition =
    orientation === 'vertical'
      ? supportingTextPositionProp ?? labelPosition
      : labelPosition;
  const hasLeading =
    (label !== undefined && labelPosition === 'start') ||
    (supportingOrErrorText !== undefined && supportingTextPosition === 'start');
  const hasTrailing =
    (label !== undefined && labelPosition === 'end') ||
    (supportingOrErrorText !== undefined && supportingTextPosition === 'end');

  const renderLabel = (): React.ReactNode =>
    label !== undefined ? (
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
    ) : null;

  const renderSupportingText = (): React.ReactNode =>
    supportingOrErrorText !== undefined ? (
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
    ) : null;

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
      {hasLeading ? (
        <div>
          {labelPosition === 'start' ? renderLabel() : null}
          {supportingTextPosition === 'start' ? renderSupportingText() : null}
        </div>
      ) : null}

      <div {...sxf('element')}>
        {typeof children === 'function'
          ? children({ id, required, disabled, readOnly })
          : children || null}
      </div>

      {hasTrailing ? (
        <div>
          {labelPosition === 'end' ? renderLabel() : null}
          {supportingTextPosition === 'end' ? renderSupportingText() : null}
        </div>
      ) : null}
    </div>
  );
});
