import { useCallback, useMemo } from 'react';

import type { ILabeledThemeFactory } from './Labeled.css';
import type { ILabeledFactory } from './Labeled.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useId } from '~/hooks/useId';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './Labeled.constants';
import { LabeledContextProvider } from './Labeled.context';
import { labeledTheme } from './Labeled.css';

export const Labeled = componentFactory<ILabeledFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      id: idProp,
      required,
      disabled,
      readOnly: readOnlyProp,
      hasError: hasErrorProp,
      errorText: errorTextProp,
      readOnlyOnLoading,
      loading,
      label,
      trailingAction,
      trailingSupportingText,
      supportingText,
      children,
      labelPosition = 'top',
      supportingTextPosition: supportingTextPositionProp,
      errorTextPosition: errorTextPositionProp,
      requiredSign,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const readOnly = readOnlyProp || (readOnlyOnLoading && loading);
    const disabledOrReadOnly = disabled || readOnly;

    const id = useId(idProp);
    const hasError = hasErrorProp && !disabledOrReadOnly;
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
      ((!!supportingText || !!trailingSupportingText || !!errorText) &&
        supportingTextPosition === 'start') ||
      (!!errorText && errorTextPosition === 'start');
    const hasTrailing =
      (!!label && !isLabelAtStart) ||
      ((!!supportingText || !!trailingSupportingText || !!errorText) &&
        supportingTextPosition === 'end') ||
      (!!errorText && errorTextPosition === 'end');
    const isHorizontal = orientation === 'horizontal';

    const { getStyles } = useComponentTheme<ILabeledThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: labeledTheme,
      modifiers: {
        disabled: disabledOrReadOnly,
        'has-error': hasError,
        horizontal: isHorizontal,
      },
    });

    const renderLabelAndAction = useCallback(
      (): React.ReactNode =>
        label && (
          <div {...getStyles('labelAndActionContainer')}>
            <div {...getStyles('labelContainer')}>
              <label {...getStyles('label')} htmlFor={id}>
                {label}
                {required && requiredSign}
              </label>
            </div>
            {trailingAction && (
              <div {...getStyles('action')}>{trailingAction}</div>
            )}
          </div>
        ),
      [label, required, requiredSign, id, trailingAction, getStyles],
    );

    const renderSupportingText = useCallback(
      (): React.ReactNode =>
        (supportingText || trailingSupportingText) && (
          <div {...getStyles('supportingTextContainer')}>
            {supportingText && (
              <div {...getStyles('supportingText')}>{supportingText}</div>
            )}
            {trailingSupportingText && (
              <div {...getStyles('trailingSupportingText')}>
                {trailingSupportingText}
              </div>
            )}
          </div>
        ),
      [getStyles, supportingText, trailingSupportingText],
    );

    const renderErrorText = useCallback(
      (): React.ReactNode =>
        errorText && <div {...getStyles('errorText')}>{errorText}</div>,
      [getStyles, errorText],
    );

    const labeledContextValue = useMemo(
      () => ({
        id,
        required,
        disabled,
        readOnly,
        hasError,
        errorText,
        loading,
      }),
      [id, required, disabled, readOnly, hasError, errorText, loading],
    );

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('wrapper')}>
          {hasLeading && (
            <div {...getStyles('rows')}>
              {isLabelAtStart && renderLabelAndAction()}
              {supportingTextPosition === 'start' && renderSupportingText()}
              {errorTextPosition === 'start' && renderErrorText()}
            </div>
          )}

          {children && (
            <div {...getStyles('content')}>
              <div {...getStyles('control')}>
                {isFunction(children) ? (
                  children({
                    id,
                    required,
                    disabled,
                    readOnly,
                    loading,
                  })
                ) : (
                  <LabeledContextProvider value={labeledContextValue}>
                    {children}
                  </LabeledContextProvider>
                )}
              </div>

              {hasTrailing && isLabelAtStart && (
                <div {...getStyles('rows')}>
                  {supportingTextPosition === 'end' && renderSupportingText()}
                  {errorTextPosition === 'end' && renderErrorText()}
                </div>
              )}
            </div>
          )}

          {hasTrailing && !isLabelAtStart && (
            <div {...getStyles('rows')}>
              {renderLabelAndAction()}
              {supportingTextPosition === 'end' && renderSupportingText()}
              {errorTextPosition === 'end' && renderErrorText()}
            </div>
          )}
        </div>
      </Box>
    );
  },
);

Labeled.theme = labeledTheme;
Labeled.displayName = `@sixui/core/${COMPONENT_NAME}`;
