import { useCallback, useMemo } from 'react';

import type { ILabeledThemeFactory } from './Labeled.css';
import type { ILabeledFactory } from './Labeled.types';
import { Flex } from '~/components/Flex';
import { extractFlexProps } from '~/components/Flex/extractFlexProps';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useId } from '~/hooks/useId';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './Labeled.constants';
import { LabeledContextProvider, useLabeledContext } from './Labeled.context';
import { labeledTheme } from './Labeled.css';

export const Labeled = componentFactory<ILabeledFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      forwardForeignProps,
      id: idProp,
      required: requiredProp,
      disabled: disabledProp,
      readOnly: readOnlyProp,
      hasError: hasErrorProp,
      errorText: errorTextProp,
      readOnlyOnLoading,
      loading: loadingProp,
      label,
      trailingAction,
      trailingSupportingText,
      supportingText,
      children,
      labelPosition = 'top',
      supportingTextPosition: supportingTextPositionProp,
      errorTextPosition: errorTextPositionProp,
      withRequiredSign,
      requiredSign = '*',
      unassociated,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { flexProps, other: otherExceptFlexProps } = extractFlexProps(other);

    const labeledContext = useLabeledContext();
    const id = useId(idProp);
    const required = requiredProp || labeledContext?.required;
    const disabled = disabledProp || labeledContext?.disabled;
    const loading = loadingProp || labeledContext?.loading;
    const readOnly =
      readOnlyProp ||
      (readOnlyOnLoading && loading) ||
      labeledContext?.readOnly;
    const disabledOrReadOnly = disabled || readOnly;
    const hasError =
      (hasErrorProp && !disabledOrReadOnly) || labeledContext?.hasError;
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
    });

    const renderLabelAndAction = useCallback(
      (): React.ReactNode =>
        label && (
          <div {...getStyles('labelAndActionContainer')}>
            <div {...getStyles('labelContainer')}>
              <label
                {...getStyles('label')}
                htmlFor={unassociated ? undefined : id}
              >
                {label}
                {required && withRequiredSign && requiredSign}
              </label>
            </div>
            {trailingAction && (
              <div {...getStyles('action')}>{trailingAction}</div>
            )}
          </div>
        ),
      [
        label,
        required,
        withRequiredSign,
        requiredSign,
        id,
        trailingAction,
        getStyles,
        unassociated,
      ],
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
      <Flex
        {...getStyles('root', {
          modifiers: {
            disabled: disabledOrReadOnly,
            readOnly,
            'has-error': hasError,
            horizontal: isHorizontal,
            unassociated,
          },
        })}
        ref={forwardedRef}
        {...flexProps}
        {...(forwardForeignProps ? undefined : otherExceptFlexProps)}
      >
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
                  loading,
                  hasError,
                  readOnly,
                  disabled,
                  foreignProps: forwardForeignProps
                    ? otherExceptFlexProps
                    : undefined,
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
      </Flex>
    );
  },
);

Labeled.displayName = `@sixui/core/${COMPONENT_NAME}`;
Labeled.theme = labeledTheme;
