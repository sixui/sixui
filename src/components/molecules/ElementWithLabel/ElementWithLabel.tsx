import { forwardRef, useMemo } from 'react';
import { isFunction } from 'lodash';

import type {
  IElementWithLabelStyleKey,
  IElementWithLabelStyleVarKey,
} from './ElementWithLabel.styledefs';
import type { IElementWithLabelProps } from './ElementWithLabelProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useId } from '@/hooks/useId';

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
      ref={forwardedRef}
      {...other}
    >
      {hasLeading ? (
        <div {...sxf('header')}>
          {labelPosition === 'start' ? renderLabel() : null}
          {supportingTextPosition === 'start' ? renderSupportingText() : null}
        </div>
      ) : null}

      <div {...sxf('element')}>
        {isFunction(children)
          ? children({ id, required, disabled, readOnly })
          : children || null}
      </div>

      {hasTrailing ? (
        <div {...sxf('header')}>
          {labelPosition === 'end' ? renderLabel() : null}
          {supportingTextPosition === 'end' ? renderSupportingText() : null}
        </div>
      ) : null}
    </div>
  );
});
