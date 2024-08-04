import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import type { ILabeledProps, ILabeledOwnProps } from './Labeled.types';
import { isFunction } from '~/helpers/isFunction';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { useId } from '~/hooks/useId';
import { elementWithLabelStyles } from './Labeled.styles';
import { elementWithLabelTheme } from './Labeled.stylex';
import { LabeledContext } from './LabeledContext';

type ILabeled = <TRoot extends React.ElementType>(
  props: ILabeledProps<TRoot>,
) => React.ReactNode;

export const Labeled: ILabeled = forwardRef(function Labeled<
  TRoot extends React.ElementType,
>(props: ILabeledProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    component: Component,
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
  } = props as IWithAsProp<ILabeledOwnProps>;

  const componentTheme = useComponentTheme('Labeled');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(elementWithLabelStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

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
    ((!!supportingText || !!errorText) && supportingTextPosition === 'start') ||
    (!!errorText && errorTextPosition === 'start');
  const hasTrailing =
    (!!label && !isLabelAtStart) ||
    ((!!supportingText || !!errorText) && supportingTextPosition === 'end') ||
    (!!errorText && errorTextPosition === 'end');

  const renderLabelAndAction = (): React.ReactNode =>
    label !== undefined ? (
      <div {...sxf('labelAndActionContainer')}>
        <div {...sxf('labelContainer')}>
          <label
            {...sxf(
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
          <div {...sxf('action', visuallyDisabled && 'action$disabled')}>
            {trailingAction}
          </div>
        ) : null}
      </div>
    ) : null;

  const renderSupportingText = (): React.ReactNode =>
    supportingText ? (
      <div
        {...sxf(
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
        {...sxf(
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
    <LabeledContext.Provider value={labeledContextValue}>
      <div
        {...sxf(
          elementWithLabelTheme,
          componentTheme.overridenStyles,
          orientation === 'horizontal' ? 'host$horizontal' : 'host$vertical',
          sx,
        )}
        ref={forwardedRef}
        {...(Component ? undefined : other)}
      >
        {hasLeading ? (
          <div {...sxf('rows')}>
            {isLabelAtStart ? renderLabelAndAction() : null}
            {supportingTextPosition === 'start' ? renderSupportingText() : null}
            {errorTextPosition === 'start' ? renderErrorText() : null}
          </div>
        ) : null}

        <div {...sxf('content')}>
          <div {...sxf('element')}>
            {Component ? (
              <Component {...other} />
            ) : isFunction(children) ? (
              children({
                id,
                required,
                disabled,
                softDisabled,
                readOnly,
                loading,
              })
            ) : (
              children
            )}
          </div>

          {hasTrailing && isLabelAtStart ? (
            <div {...sxf('rows')}>
              {supportingTextPosition === 'end' ? renderSupportingText() : null}
              {errorTextPosition === 'end' ? renderErrorText() : null}
            </div>
          ) : null}
        </div>

        {hasTrailing && !isLabelAtStart ? (
          <div {...sxf('rows')}>
            {renderLabelAndAction()}
            {supportingTextPosition === 'end' ? renderSupportingText() : null}
            {errorTextPosition === 'end' ? renderErrorText() : null}
          </div>
        ) : null}
      </div>
    </LabeledContext.Provider>
  );
});
