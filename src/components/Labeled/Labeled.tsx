import { useCallback, useMemo } from 'react';

import type { ILabeledThemeFactory } from './Labeled.css';
import type { ILabeledFactory } from './Labeled.types';
import { Box } from '~/components/Box';
import { isFunction } from '~/helpers/isFunction';
import { useId } from '~/hooks/useId';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { LabeledContextProvider } from './Labeled.context';
import { labeledTheme } from './Labeled.css';

const COMPONENT_NAME = 'Labeled';

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
      loading,
      label,
      trailingAction,
      supportingText,
      children,
      labelPosition = 'top',
      supportingTextPosition: supportingTextPositionProp,
      errorTextPosition: errorTextPositionProp,
      requiredSign,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const readOnly = readOnlyProp || loading;
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
      ((!!supportingText || !!errorText) &&
        supportingTextPosition === 'start') ||
      (!!errorText && errorTextPosition === 'start');
    const hasTrailing =
      (!!label && !isLabelAtStart) ||
      ((!!supportingText || !!errorText) && supportingTextPosition === 'end') ||
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
        supportingText && (
          <div {...getStyles('supportingText')}>{supportingText}</div>
        ),
      [getStyles, supportingText],
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
      </Box>
    );
  },
);

Labeled.theme = labeledTheme;
Labeled.displayName = `@sixui/${COMPONENT_NAME}`;
