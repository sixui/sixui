import type { IStepContextValue } from './Step.context';
import type { IStepThemeFactory } from './Step.css';
import type { IStepFactory } from './Step.types';
import { isFunction } from '~/helpers/isFunction';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { extractBoxProps } from '../Box/extractBoxProps';
import { Button } from '../Button';
import { StepIndicator } from '../StepIndicator';
import { useStepperContext } from '../Stepper';
import { StepContextProvider } from './Step.context';
import { stepTheme } from './Step.css';

const COMPONENT_NAME = 'Step';

export const Step = componentFactory<IStepFactory>((props, forwardedRef) => {
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

  const stepperContext = useStepperContext();

  const hasText = !!label || !!supportingText;
  const completed =
    !disabled &&
    (stepperContext?.completed ||
      (completedProp ??
        (stepperContext?.activeStep !== undefined &&
          index < stepperContext.activeStep)));
  const previousCompleted =
    !disabled &&
    stepperContext?.activeStep !== undefined &&
    index <= stepperContext.activeStep;
  const active =
    !disabled &&
    (activeProp ?? (stepperContext && index === stepperContext.activeStep));
  const loading = stepperContext?.loading || loadingProp;
  const labelPosition = hasText
    ? (labelPositionProp ?? stepperContext?.labelPosition ?? 'right')
    : 'right';
  const connectorRenderer =
    connectorRendererProp ?? stepperContext?.connectorRenderer;
  const orientation =
    orientationProp ?? stepperContext?.orientation ?? 'horizontal';
  const expanded =
    orientation === 'vertical' && !!children && (active || alwaysExpanded);
  const first = index === 0;

  const { getStyles } = useComponentTheme<IStepThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: stepTheme,
    modifiers: {
      'label-position': labelPosition,
      orientation,
    },
  });

  const stepContextValue: IStepContextValue = {
    completed,
    hasContent: expanded,
    hasText,
    orientation,
    labelPosition,
  };

  // As the step height may change depending on the content, in a vertical
  // orientation, we need to add inner top and bottom connectors in order to
  // connect the bullet point to the previous and next elements.
  const renderInnerConnectors = connectorRenderer
    ? (): React.ReactNode => (
        <>
          {/* Connect the bullet point to the previous element, if any. */}
          {!first && (
            // This connector must be rendered in the context of the previous
            // step.
            <StepContextProvider
              value={{ ...stepContextValue, completed: previousCompleted }}
            >
              <div
                {...getStyles(['connectorContainer', 'connectorContainer$top'])}
              >
                {connectorRenderer({ extension: 'top' })}
              </div>
            </StepContextProvider>
          )}

          {/* Connect the bullet point to the next element, if any. */}
          {!last && (
            <div
              {...getStyles([
                'connectorContainer',
                'connectorContainer$bottom',
              ])}
            >
              {connectorRenderer({ extension: 'bottom' })}
            </div>
          )}
        </>
      )
    : undefined;

  return (
    <StepContextProvider value={stepContextValue}>
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
              start={
                <StepIndicator
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
                    <div {...getStyles('supportingText')}>{supportingText}</div>
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
                  {connectorRenderer({ extension: 'middle' })}
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
                {connectorRenderer()}
              </div>
            )}
        </Box>

        {connectorRenderer && !last && labelPosition === 'right' && (
          <div {...getStyles('extensibleConnectorContainer')}>
            <div {...getStyles('connectorContainer')}>
              {connectorRenderer()}
            </div>
          </div>
        )}
      </div>
    </StepContextProvider>
  );
});

Step.theme = stepTheme;
Step.displayName = `@sixui/${COMPONENT_NAME}`;
