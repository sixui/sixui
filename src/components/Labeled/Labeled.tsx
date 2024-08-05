import { forwardRef, useMemo } from 'react';

import type { ILabeledProps } from './Labeled.types';
import { isFunction } from '~/helpers/isFunction';
import { useStyles } from '~/hooks/useStyles';
import { useId } from '~/hooks/useId';
import { labeledStyles } from './Labeled.styles';
import { labeledTheme } from './Labeled.stylex';
import { LabeledContext } from './Labeled.context';
import { Base } from '../Base';

export const Labeled = forwardRef<HTMLDivElement, ILabeledProps>(
  function Labeled(props, forwardedRef) {
    const {
      styles,
      sx,
      id: idProp,
      label,
      trailingAction,
      required,
      readOnly,
      supportingText,
      errorText: errorTextProp,
      children,
      hasError: hasErrorProp,
      labelPosition = 'top',
      supportingTextPosition: supportingTextPositionProp,
      errorTextPosition: errorTextPositionProp,
      disabled,
      softDisabled: softDisabledProp,
      loading,
      ...other
    } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'Labeled',
      styles: [labeledStyles, styles],
    });

    const softDisabled = softDisabledProp || readOnly || loading;
    const visuallyDisabled = disabled || softDisabled;

    const id = useId(idProp);
    const hasError = hasErrorProp && !visuallyDisabled;
    const errorText = hasError ? errorTextProp : undefined;
    const orientation = ['top', 'bottom'].includes(labelPosition)
      ? 'vertical'
      : 'horizontal';
    const isLabelAtStart = ['top', 'left'].includes(labelPosition);
    const supportingTextPosition =
      labelPosition === 'top'
        ? (supportingTextPositionProp ?? 'start')
        : labelPosition === 'bottom'
          ? (supportingTextPositionProp ?? 'end')
          : labelPosition === 'left'
            ? 'start'
            : 'end';
    const errorTextPosition = errorTextPositionProp ?? supportingTextPosition;
    const hasLeading =
      (!!label && isLabelAtStart) ||
      ((!!supportingText || !!errorText) &&
        supportingTextPosition === 'start') ||
      (!!errorText && errorTextPosition === 'start');
    const hasTrailing =
      (!!label && !isLabelAtStart) ||
      ((!!supportingText || !!errorText) && supportingTextPosition === 'end') ||
      (!!errorText && errorTextPosition === 'end');

    const renderLabelAndAction = (): React.ReactNode =>
      label !== undefined ? (
        <div {...getStyles('labelAndActionContainer')}>
          <div {...getStyles('labelContainer')}>
            <label
              {...getStyles(
                'label',
                visuallyDisabled
                  ? 'label$disabled'
                  : hasError && !errorText && 'label$error',
              )}
              htmlFor={id}
            >
              {label}
              {required ? '*' : null}
            </label>
          </div>
          {trailingAction ? (
            <div
              {...getStyles('action', visuallyDisabled && 'action$disabled')}
            >
              {trailingAction}
            </div>
          ) : null}
        </div>
      ) : null;

    const renderSupportingText = (): React.ReactNode =>
      supportingText ? (
        <div
          {...getStyles(
            'supportingText',
            visuallyDisabled && 'supportingText$disabled',
          )}
        >
          {supportingText}
        </div>
      ) : null;

    const renderErrorText = (): React.ReactNode =>
      errorText ? (
        <div
          {...getStyles(
            'supportingText',
            'supportingText$error',
            visuallyDisabled && 'supportingText$disabled',
          )}
        >
          {errorText}
        </div>
      ) : null;

    const labeledContextValue = useMemo(
      () => ({
        id,
        required,
        disabled,
        softDisabled,
        readOnly,
        hasError,
        errorText,
        loading,
      }),
      [
        id,
        required,
        disabled,
        softDisabled,
        readOnly,
        hasError,
        errorText,
        loading,
      ],
    );

    return (
      <Base
        {...other}
        sx={[
          labeledTheme,
          globalStyles,
          ...combineStyles(
            orientation === 'horizontal' ? 'host$horizontal' : 'host$vertical',
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        {hasLeading ? (
          <div {...getStyles('rows')}>
            {isLabelAtStart ? renderLabelAndAction() : null}
            {supportingTextPosition === 'start' ? renderSupportingText() : null}
            {errorTextPosition === 'start' ? renderErrorText() : null}
          </div>
        ) : null}

        {children ? (
          <div {...getStyles('content')}>
            <div {...getStyles('element')}>
              {isFunction(children) ? (
                children({
                  id,
                  required,
                  disabled,
                  softDisabled,
                  readOnly,
                  loading,
                })
              ) : (
                <LabeledContext.Provider value={labeledContextValue}>
                  {children}
                </LabeledContext.Provider>
              )}
            </div>

            {hasTrailing && isLabelAtStart ? (
              <div {...getStyles('rows')}>
                {supportingTextPosition === 'end'
                  ? renderSupportingText()
                  : null}
                {errorTextPosition === 'end' ? renderErrorText() : null}
              </div>
            ) : null}
          </div>
        ) : null}

        {hasTrailing && !isLabelAtStart ? (
          <div {...getStyles('rows')}>
            {renderLabelAndAction()}
            {supportingTextPosition === 'end' ? renderSupportingText() : null}
            {errorTextPosition === 'end' ? renderErrorText() : null}
          </div>
        ) : null}
      </Base>
    );
  },
);
