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
    as: Component,
    styles,
    sx,
    id: idProp,
    label,
    action,
    required,
    readOnly,
    supportingText,
    errorText: errorTextProp,
    children,
    hasError: hasErrorProp,
    labelPosition = 'top',
    supportingTextPosition: supportingTextPositionProp,
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
    orientation === 'vertical'
      ? (supportingTextPositionProp ?? labelPosition)
      : labelPosition;
  const hasLeading =
    (!!label && isLabelAtStart) ||
    ((!!supportingText || !!errorText) && supportingTextPosition === 'top');
  const hasTrailing =
    (!!label && !isLabelAtStart) ||
    ((!!supportingText || !!errorText) && supportingTextPosition === 'bottom');

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
        {action ? (
          <div {...sxf('action', visuallyDisabled && 'action$disabled')}>
            {action}
          </div>
        ) : null}
      </div>
    ) : null;

  const renderSupportingText = (): React.ReactNode =>
    supportingText || errorText ? (
      <>
        {supportingText ? (
          <div
            {...sxf(
              'supportingText',
              visuallyDisabled && 'supportingText$disabled',
            )}
          >
            {supportingText}
          </div>
        ) : null}
        {errorText ? (
          <div
            {...sxf(
              'supportingText',
              'supportingText$error',
              visuallyDisabled && 'supportingText$disabled',
            )}
          >
            {errorText}
          </div>
        ) : null}
      </>
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
          <div {...sxf('header')}>
            {isLabelAtStart ? renderLabelAndAction() : null}
            {supportingTextPosition === 'top' ? renderSupportingText() : null}
          </div>
        ) : null}

        {Component ? <Component {...other} /> : null}

        {children ? (
          <div {...sxf('element')}>
            {isFunction(children)
              ? children({
                  id,
                  required,
                  disabled,
                  softDisabled,
                  readOnly,
                  loading,
                })
              : children}
          </div>
        ) : null}

        {hasTrailing ? (
          <div {...sxf('header')}>
            {isLabelAtStart ? null : renderLabelAndAction()}
            {supportingTextPosition === 'bottom'
              ? renderSupportingText()
              : null}
          </div>
        ) : null}
      </div>
    </LabeledContext.Provider>
  );
});
