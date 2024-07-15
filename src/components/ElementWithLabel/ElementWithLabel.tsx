import { forwardRef, useMemo } from 'react';
import { isFunction } from 'lodash';

import type { IElementWithLabelProps } from './ElementWithLabel.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useId } from '@/hooks/useId';
import { elementWithLabelStyles } from './ElementWithLabel.styles';
import { elementWithLabelTheme } from './ElementWithLabel.stylex';

export const ElementWithLabel = forwardRef<
  HTMLDivElement,
  IElementWithLabelProps
>(function ElementWithLabel(props, forwardedRef) {
  const {
    styles,
    sx,
    id: idProp,
    label,
    action,
    required,
    disabled,
    readOnly,
    supportingText,
    errorText: errorTextProp,
    children,
    hasError: hasErrorProp,
    orientation = 'vertical',
    labelPosition = orientation === 'vertical' ? 'start' : 'end',
    supportingTextPosition: supportingTextPositionProp,
    ...other
  } = props;

  const { overridenStyles } = useComponentTheme('ElementWithLabel');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(elementWithLabelStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const id = useId(idProp);
  const hasError = hasErrorProp && !disabled;
  const errorText = hasError ? errorTextProp : undefined;
  const supportingTextPosition =
    orientation === 'vertical'
      ? (supportingTextPositionProp ?? labelPosition)
      : labelPosition;
  const hasLeading =
    (!!label && labelPosition === 'start') ||
    ((!!supportingText || !!errorText) && supportingTextPosition === 'start');
  const hasTrailing =
    (!!label && labelPosition === 'end') ||
    ((!!supportingText || !!errorText) && supportingTextPosition === 'end');

  const renderLabel = (): React.ReactNode =>
    label !== undefined ? (
      <div {...sxf('labelContainer')}>
        <label
          {...sxf(
            'label',
            disabled
              ? 'label$disabled'
              : hasError && !errorText && 'label$error',
          )}
          htmlFor={id}
        >
          {label}
          {required ? '*' : null}
        </label>
        {action ? (
          <div {...sxf('action', disabled && 'action$disabled')}>{action}</div>
        ) : null}
      </div>
    ) : null;

  const renderSupportingText = (): React.ReactNode =>
    supportingText || errorText ? (
      <>
        {supportingText ? (
          <div
            {...sxf('supportingText', disabled && 'supportingText$disabled')}
          >
            {supportingText}
          </div>
        ) : null}
        {errorText ? (
          <div
            {...sxf(
              'supportingText',
              'supportingText$error',
              disabled && 'supportingText$disabled',
            )}
          >
            {errorText}
          </div>
        ) : null}
      </>
    ) : null;

  return (
    <div
      {...sxf(
        elementWithLabelTheme,
        overridenStyles,
        orientation === 'horizontal' ? 'host$horizontal' : 'host$vertical',
        sx,
      )}
      ref={forwardedRef}
      {...other}
    >
      {hasLeading ? (
        <div {...sxf('header')}>
          {labelPosition === 'start' ? renderLabel() : null}
          {supportingTextPosition === 'start' ? renderSupportingText() : null}
        </div>
      ) : null}

      {children ? (
        <div {...sxf('element')}>
          {isFunction(children)
            ? children({ id, required, disabled, readOnly })
            : children}
        </div>
      ) : null}

      {hasTrailing ? (
        <div {...sxf('header')}>
          {labelPosition === 'end' ? renderLabel() : null}
          {supportingTextPosition === 'end' ? renderSupportingText() : null}
        </div>
      ) : null}
    </div>
  );
});
