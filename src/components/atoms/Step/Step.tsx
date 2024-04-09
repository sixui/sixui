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

    const renderButtonInner = (): React.ReactElement => (
      <>
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
            {...sxf('labelContainer', `labelContainer$${labelPosition}Label`)}
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
      </>
    );

    const contextValue: IStepContext = {
      completed,
      hasContent: contentExpanded,
      hasText,
      orientation,
      labelPosition,
    };

    const renderX = () =>
      isValidElement(nextConnector) && orientation === 'vertical' ? (
        <>
          {/* As the step height may change depending on the content, in a
                vertical orientation, we need to add a top connector and a
                bottom connector to connect the bullet point to the previous and
                next elements.
             */}

          {/* Connect the bullet point to the previous element. */}
          {!isFirst ? (
            // This connector should be rendered in the context of the
            // previous step.
            <StepContext.Provider
              value={{ ...contextValue, completed: previousCompleted }}
            >
              <div {...sxf('topConnectorContainer')}>
                {/* FIXME: merge both divs */}
                <div {...sxf('connectorContainer')}>
                  {cloneElement(nextConnector, { children: undefined })}
                </div>
              </div>
            </StepContext.Provider>
          ) : null}

          {/* Connect the bullet point to the next element. */}
          {!isLast ? (
            <div {...sxf('bottomConnectorContainer')}>
              {/* FIXME: merge both divs */}
              <div {...sxf('connectorContainer')}>
                {cloneElement(nextConnector, { children: undefined })}
              </div>
            </div>
          ) : null}
        </>
      ) : null;

    return (
      <StepContext.Provider value={contextValue}>
        <div style={{ display: 'contents' }} {...sxf(theme.vars, sx)}>
          <div
            {...sxf('host', `host$${labelPosition}Label`)}
            ref={ref}
            {...other}
          >
            {/* FIXME: style */}
            {/* <div style={{ position: 'relative' }}>{renderButtonInner()}</div> */}

            <div
              {...sxf(
                'buttonContainer',
                labelPosition === 'bottom' && 'buttonContainer$bottomLabel',
              )}
            >
              {renderX()}
              {onClick ? (
                <ButtonBase
                  sx={stylesCombinator(
                    'button',
                    `button$${labelPosition}Label`,
                  )}
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
                  <div
                    {...sxf(
                      'buttonInner',
                      labelPosition === 'bottom' && 'buttonInner$bottomLabel',
                    )}
                  >
                    {renderButtonInner()}
                  </div>
                </ButtonBase>
              ) : (
                <>
                  {renderX()}
                  <div {...sxf('button', `button$${labelPosition}Label`)}>
                    {renderButtonInner()}
                  </div>
                </>
              )}
            </div>

            {contentExpanded ? (
              <div {...sxf('content')}>
                {/* Connect the content block to the next connector. */}
                {nextConnector && !isLast && isValidElement(nextConnector) ? (
                  // FIXME: merge both divs
                  <div {...sxf('contentConnectorContainer')}>
                    <div {...sxf('connectorContainer')}>
                      {cloneElement(nextConnector, { children: undefined })}
                    </div>
                  </div>
                ) : null}
                <div {...sxf('contentText')}>{children}</div>
              </div>
            ) : null}
            {nextConnector && !isLast && labelPosition === 'bottom' ? (
              <div
                {...sxf(
                  'connectorContainer',
                  `connectorContainer$${orientation}$bottomLabel`,
                )}
              >
                {nextConnector}
              </div>
            ) : null}
          </div>

          {!isLast && labelPosition === 'right' ? (
            <div
              style={{
                display: 'flex',
                flexGrow: 1,
                position: 'relative',
                alignItems: 'center',
                minHeight: 64,
              }}
            >
              {/* FIXME: style */}
              <div
                {...sxf(
                  'connectorContainer',
                  `connectorContainer$${orientation}$rightLabel`,
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
