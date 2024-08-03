import {
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
} from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IStepProps } from './Step.types';
import { isFunction } from '~/helpers/isFunction';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { StepperContext } from '~/components/Stepper/StepperContext';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { ButtonBase } from '~/components/ButtonBase';
import { SvgIcon } from '~/components/SvgIcon';
import { iconCheckMark, iconExclamationTriangle } from '~/assets/icons';
import {
  stepCircularProgressIndicatorStyles,
  stepFocusRingStyles,
  stepStyles,
} from './Step.styles';
import { stepTheme } from './Step.stylex';
import { StepContext, type IStepContextValue } from './StepContext';

export const Step = forwardRef<HTMLDivElement, IStepProps>(
  function Step(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      active: activeProp,
      completed: completedProp,
      disabled,
      index = 0,
      last: isLast,
      icon,
      label,
      supportingText,
      hasError,
      loading: loadingProp,
      orientation: orientationProp,
      labelPosition: labelPositionProp,
      nextConnector: nextConnectorProp,
      alwaysExpanded,
      children,
      onClick,
      ...other
    } = props;

    const componentTheme = useComponentTheme('Step');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(stepStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const context = useContext(StepperContext);

    const hasText = !!label || !!supportingText;

    const completed =
      !disabled &&
      (context?.completed ||
        (completedProp ??
          (context?.activeStep !== undefined && index < context.activeStep)));
    const previousCompleted =
      !disabled &&
      context?.activeStep !== undefined &&
      index <= context.activeStep;
    const isActive =
      !disabled && (activeProp ?? (context && index === context.activeStep));
    const loading = context?.loading || loadingProp;
    const labelPosition = hasText
      ? (labelPositionProp ?? context?.labelPosition ?? 'right')
      : 'right';
    const nextConnector =
      nextConnectorProp !== undefined ? nextConnectorProp : context?.connector;
    const orientation = orientationProp ?? context?.orientation ?? 'horizontal';
    const expanded =
      orientation === 'vertical' && !!children && (isActive || alwaysExpanded);
    const isFirst = index === 0;

    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : completed
          ? 'completed'
          : !isActive
            ? 'inactive'
            : undefined;

    const contextValue: IStepContextValue = {
      completed,
      hasContent: expanded,
      hasText,
      orientation,
      labelPosition,
    };

    const renderButtonInner = (isInteractive: boolean): React.ReactElement => (
      <div
        {...sxf(
          'buttonInner',
          labelPosition === 'right' && 'buttonInner$rightLabel',
          labelPosition === 'bottom' && 'buttonInner$bottomLabel',
        )}
      >
        {loading || icon || hasError ? (
          <div {...sxf('bulletPoint')}>
            <div {...sxf('icon', state && `icon$${state}`)}>
              {loading ? (
                <IndeterminateCircularProgressIndicator
                  styles={[
                    stepCircularProgressIndicatorStyles,
                    ...asArray(innerStyles?.circularProgressIndicator),
                  ]}
                />
              ) : (
                (icon ??
                (hasError ? <SvgIcon icon={iconExclamationTriangle} /> : null))
              )}
            </div>
          </div>
        ) : (
          <div {...sxf('bulletPoint', 'bulletPoint$container')}>
            <div {...sxf('background', state && `background$${state}`)} />
            <div {...sxf('text', state && `text$${state}`)}>
              {completed ? <SvgIcon icon={iconCheckMark} /> : index + 1}
            </div>
          </div>
        )}

        {hasText ? (
          <div
            {...sxf(
              'labelContainer',
              labelPosition === 'right' && `labelContainer$rightLabel`,
              labelPosition === 'bottom' && `labelContainer$bottomLabel`,
            )}
          >
            {label ? (
              <div
                {...sxf(
                  'label',
                  isInteractive && 'label$interactive',
                  state && `label$${state}`,
                )}
              >
                {label}
              </div>
            ) : null}
            {supportingText ? (
              <div
                {...sxf(
                  'supportingText',
                  isInteractive && 'supportingText$interactive',
                  state && `supportingText$${state}`,
                )}
              >
                {supportingText}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );

    const renderConnectorWithoutChildren = (): React.ReactNode =>
      isValidElement(nextConnector)
        ? cloneElement<{ children?: React.ReactNode }>(
            nextConnector as React.ReactElement<{
              children?: React.ReactNode;
            }>,
            { children: undefined },
          )
        : null;

    // As the step height may change depending on the content, in a vertical
    // orientation, we need to add inner top and bottom connectors in order to
    // connect the bullet point to the previous and next elements.
    const renderInnerConnectors = (): React.ReactNode => (
      <>
        {/* Connect the bullet point to the previous element, if any. */}
        {!isFirst ? (
          // This connector must be rendered in the context of the previous
          // step.
          <StepContext.Provider
            value={{ ...contextValue, completed: previousCompleted }}
          >
            <div {...sxf('connectorContainer', 'connectorContainer$top')}>
              {renderConnectorWithoutChildren()}
            </div>
          </StepContext.Provider>
        ) : null}

        {/* Connect the bullet point to the next element, if any. */}
        {!isLast ? (
          <div {...sxf('connectorContainer', 'connectorContainer$bottom')}>
            {renderConnectorWithoutChildren()}
          </div>
        ) : null}
      </>
    );

    return (
      <StepContext.Provider value={contextValue}>
        <div
          {...other}
          {...sxf(
            stepTheme,
            componentTheme.overridenStyles,
            'host',
            labelPosition === 'bottom' && `host$bottomLabel`,
            sx,
          )}
          ref={forwardedRef}
        >
          <div
            {...sxf(
              'buttonContainer',
              labelPosition === 'bottom' && 'buttonContainer$bottomLabel',
            )}
          >
            {orientation === 'vertical' ? renderInnerConnectors() : null}
            {onClick ? (
              <ButtonBase
                sx={stylesCombinator('button')}
                innerStyles={{
                  ...innerStyles,
                  focusRing: [
                    stepFocusRingStyles,
                    ...asArray(innerStyles?.focusRing),
                  ],
                }}
                onClick={onClick}
                disabled={disabled}
              >
                {renderButtonInner(true)}
              </ButtonBase>
            ) : (
              <div {...sxf('button')}>{renderButtonInner(false)}</div>
            )}
          </div>

          {expanded ? (
            <div {...sxf('content')}>
              {/* Connect the content block to the next connector. */}
              {!isLast ? (
                <div
                  {...sxf('connectorContainer', 'connectorContainer$content')}
                >
                  {renderConnectorWithoutChildren()}
                </div>
              ) : null}
              <div {...sxf('contentText')}>
                {isFunction(children)
                  ? children({
                      active: !!isActive,
                      completed,
                      hasError: !!hasError,
                    })
                  : children}
              </div>
            </div>
          ) : null}

          {!isLast &&
          orientation === 'horizontal' &&
          labelPosition === 'bottom' ? (
            <div
              {...sxf(
                'connectorContainer',
                'connectorContainer$horizontal$bottomLabel',
              )}
            >
              {nextConnector}
            </div>
          ) : null}
        </div>

        {!isLast && labelPosition === 'right' ? (
          <div
            {...sxf(
              'extensibleConnectorContainer',
              orientation === 'horizontal' &&
                'extensibleConnectorContainer$horizontal',
              orientation === 'vertical' &&
                'extensibleConnectorContainer$vertical',
            )}
          >
            <div
              {...sxf(
                'connectorContainer',
                orientation === 'horizontal' &&
                  'connectorContainer$horizontal$rightLabel',
              )}
            >
              {nextConnector}
            </div>
          </div>
        ) : null}
      </StepContext.Provider>
    );
  },
);
Step.displayName = 'Step';
