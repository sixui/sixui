import {
  cloneElement,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
} from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IContainerProps } from '@/helpers/types';
import type { IStepStyleKey, IStepStyleVarKey } from './Step.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { ReactComponent as CheckMarkIcon } from '@/assets/CheckMark.svg';
import { ReactComponent as ExclamationTriangleIcon } from '@/assets/ExclamationTriangle.svg';
import {
  StepperContext,
  type IStepperContext,
} from '@/components/atoms/Stepper/StepperContext';
import { ButtonBase, type IButtonBaseOwnProps } from '../ButtonBase';
import { StepContext, type IStepContext } from './StepContext';

export type IStepProps = IContainerProps<IStepStyleKey> & {
  innerStyles?: IButtonBaseOwnProps['innerStyles'];
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  index?: number;
  last?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  hasError?: boolean;
  onClick?: () => void;
  orientation?: IStepperContext['orientation'];
  nextConnector?: IStepperContext['connector'];

  /**
   * Only supported in vertical orientation.
   */
  labelPosition?: IStepperContext['labelPosition'];

  /**
   * Only supported in vertical orientation.
   */
  children?: React.ReactNode;
};

export const Step = forwardRef<HTMLDivElement, IStepProps>(
  function Step(props, ref) {
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
      orientation: orientationProp,
      labelPosition: labelPositionProp,
      nextConnector: nextConnectorProp,
      children,
      onClick,
      ...other
    } = props;

    const { theme } = useComponentTheme('Step');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IStepStyleKey, IStepStyleVarKey>(stylesCombinator),
      [stylesCombinator],
    );

    const context = useContext(StepperContext);

    const isIcon = !!icon || hasError;
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
    const labelPosition = hasText
      ? labelPositionProp ?? context?.labelPosition ?? 'right'
      : 'right';
    const nextConnector =
      nextConnectorProp !== undefined ? nextConnectorProp : context?.connector;
    const orientation = orientationProp ?? context?.orientation ?? 'horizontal';
    const contentExpanded =
      isActive && orientation === 'vertical' && !!children;
    const isFirst = index === 0;

    const state = disabled
      ? 'disabled'
      : hasError
        ? 'error'
        : isActive
          ? 'active'
          : completed
            ? 'completed'
            : undefined;

    const contextValue: IStepContext = {
      completed,
      hasContent: contentExpanded,
      hasText,
      orientation,
      labelPosition,
    };

    const renderButtonInner = (): React.ReactElement => (
      <div
        {...sxf(
          'buttonInner',
          labelPosition === 'right' && 'buttonInner$rightLabel',
          labelPosition === 'bottom' && 'buttonInner$bottomLabel',
        )}
      >
        <div
          {...sxf(
            'bulletPoint',
            isIcon ? 'bulletPoint$icon' : 'bulletPoint$text',
            state &&
              (isIcon
                ? `bulletPoint$icon$${state}`
                : `bulletPoint$text$${state}`),
          )}
        >
          {icon ??
            (completed ? (
              <CheckMarkIcon aria-hidden />
            ) : hasError ? (
              <ExclamationTriangleIcon aria-hidden />
            ) : (
              index + 1
            ))}
        </div>

        {hasText ? (
          <div
            {...sxf(
              'labelContainer',
              labelPosition === 'right' && `labelContainer$rightLabel`,
              labelPosition === 'bottom' && `labelContainer$bottomLabel`,
            )}
          >
            {label ? (
              <div {...sxf('label', state && `label$${state}`)}>{label}</div>
            ) : null}
            {supportingText ? (
              <div
                {...sxf('supportingText', state && `supportingText$${state}`)}
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
        <div style={{ display: 'contents' }} {...sxf(theme.vars, sx)}>
          <div
            {...sxf('host', labelPosition === 'bottom' && `host$bottomLabel`)}
            ref={ref}
            {...other}
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
                      theme.focusRingStyles,
                      ...asArray(innerStyles?.focusRing),
                    ],
                  }}
                  onClick={onClick}
                  disabled={disabled}
                >
                  {renderButtonInner()}
                </ButtonBase>
              ) : (
                <div {...sxf('button')}>{renderButtonInner()}</div>
              )}
            </div>

            {contentExpanded ? (
              <div {...sxf('content')}>
                {/* Connect the content block to the next connector. */}
                {!isLast ? (
                  <div
                    {...sxf('connectorContainer', 'connectorContainer$content')}
                  >
                    {renderConnectorWithoutChildren()}
                  </div>
                ) : null}
                <div {...sxf('contentText')}>{children}</div>
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
        </div>
      </StepContext.Provider>
    );
  },
);
Step.displayName = 'Step';
