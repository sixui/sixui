import type { IStepperStepContextValue } from './StepperStep.context';
import type { IStepperStepThemeFactory } from './StepperStep.css';
import type { IStepperStepFactory } from './StepperStep.types';
import { Box } from '~/components/Box';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Button } from '~/components/Button';
import { isFunction } from '~/helpers/isFunction';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useStepperContext } from '../Stepper.context';
import { COMPONENT_NAME } from './StepperStep.constants';
import { StepperStepContextProvider } from './StepperStep.context';
import { StepperStepIndicator } from './StepperStepIndicator';
import { stepperStepTheme } from './StepperStep.css';

export const StepperStep = componentFactory<IStepperStepFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      active: activeProp,
      completed: completedProp,
      disabled,
      loading: loadingProp,
      index = 0,
      last,
      icon,
      label,
      supportingText,
      hasError,
      orientation: orientationProp,
      connectorRenderer: connectorRendererProp,
      alwaysExpanded,
      labelPosition: labelPositionProp,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const stepperStepperContext = useStepperContext();

    const hasText = !!label || !!supportingText;
    const completed =
      !disabled &&
      (stepperStepperContext?.completed ||
        (completedProp ??
          (stepperStepperContext?.activeStep !== undefined &&
            index < stepperStepperContext.activeStep)));
    const previousCompleted =
      !disabled &&
      stepperStepperContext?.activeStep !== undefined &&
      index <= stepperStepperContext.activeStep;
    const active =
      !disabled &&
      (activeProp ??
        (stepperStepperContext && index === stepperStepperContext.activeStep));
    const loading = stepperStepperContext?.loading || loadingProp;
    const labelPosition = hasText
      ? (labelPositionProp ?? stepperStepperContext?.labelPosition ?? 'right')
      : 'right';
    const connectorRenderer =
      connectorRendererProp ?? stepperStepperContext?.connectorRenderer;
    const orientation =
      orientationProp ?? stepperStepperContext?.orientation ?? 'horizontal';
    const expanded =
      orientation === 'vertical' && !!children && (active || alwaysExpanded);
    const first = index === 0;

    const { getStyles } = useComponentTheme<IStepperStepThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: stepperStepTheme,
      modifiers: {
        'label-position': labelPosition,
        orientation,
      },
    });

    const stepperStepContextValue: IStepperStepContextValue = {
      completed,
      hasContent: expanded,
      hasText,
      orientation,
      labelPosition,
    };

    // As the stepperStep height may change depending on the content, in a vertical
    // orientation, we need to add inner top and bottom connectors in order to
    // connect the bullet point to the previous and next elements.
    const renderInnerConnectors = connectorRenderer
      ? (): React.ReactNode => (
          <>
            {/* Connect the bullet point to the previous element, if any. */}
            {!first && (
              // This connector must be rendered in the context of the previous
              // stepperStep.
              <StepperStepContextProvider
                value={{
                  ...stepperStepContextValue,
                  completed: previousCompleted,
                }}
              >
                <div
                  {...getStyles([
                    'connectorContainer',
                    'connectorContainer$top',
                  ])}
                >
                  {connectorRenderer({ orientation, part: 'start' })}
                </div>
              </StepperStepContextProvider>
            )}

            {/* Connect the bullet point to the next element, if any. */}
            {!last && (
              <div
                {...getStyles([
                  'connectorContainer',
                  'connectorContainer$bottom',
                ])}
              >
                {connectorRenderer({ orientation, part: 'end' })}
              </div>
            )}
          </>
        )
      : undefined;

    return (
      <StepperStepContextProvider value={stepperStepContextValue}>
        <div {...getStyles('root')}>
          <Box {...getStyles('wrapper')} {...boxProps}>
            <div {...getStyles('buttonContainer')}>
              {orientation === 'vertical' && renderInnerConnectors?.()}

              <Button
                {...getStyles('button')}
                loading={loading}
                disabled={disabled}
                variant={false}
                ref={forwardedRef}
                startSlot={
                  <StepperStepIndicator
                    {...getStyles('indicator')}
                    label={index + 1}
                    icon={icon}
                    hasError={hasError}
                    completed={completed}
                    active={active}
                    loading={loading}
                    disabled={disabled}
                  />
                }
                {...forwardedProps}
              >
                {(label || supportingText) && (
                  <>
                    {label && <div>{label}</div>}
                    {supportingText && (
                      <div {...getStyles('supportingText')}>
                        {supportingText}
                      </div>
                    )}
                  </>
                )}
              </Button>
            </div>

            {expanded && (
              <div {...getStyles('content')}>
                {/* Connect the content block to the next connector. */}
                {connectorRenderer && !last && (
                  <div
                    {...getStyles([
                      'connectorContainer',
                      'connectorContainer$content',
                    ])}
                  >
                    {connectorRenderer({ orientation, part: 'content' })}
                  </div>
                )}
                <div {...getStyles('contentText')}>
                  {isFunction(children)
                    ? children({
                        active,
                        completed,
                        hasError,
                      })
                    : children}
                </div>
              </div>
            )}

            {connectorRenderer &&
              !last &&
              orientation === 'horizontal' &&
              labelPosition === 'bottom' && (
                <div {...getStyles(['connectorContainer'])}>
                  {connectorRenderer({ orientation, part: 'main' })}
                </div>
              )}
          </Box>

          {connectorRenderer && !last && labelPosition === 'right' && (
            <div {...getStyles('extensibleConnectorContainer')}>
              <div {...getStyles('connectorContainer')}>
                {connectorRenderer({ orientation, part: 'main' })}
              </div>
            </div>
          )}
        </div>
      </StepperStepContextProvider>
    );
  },
);

StepperStep.theme = stepperStepTheme;
StepperStep.displayName = `@sixui/${COMPONENT_NAME}`;
StepperStep.Indicator = StepperStepIndicator;
