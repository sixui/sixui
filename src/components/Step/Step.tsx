import type { IStepContextValue } from './Step.context';
import type { IStepThemeFactory } from './Step.css';
import type { IStepFactory } from './Step.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
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
    nextConnector: nextConnectorProp,
    alwaysExpanded,
    labelPosition: labelPositionProp,
    children,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

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
  const nextConnector =
    nextConnectorProp !== undefined
      ? nextConnectorProp
      : stepperContext?.connector;
  const orientation =
    orientationProp ?? stepperContext?.orientation ?? 'horizontal';
  const expanded =
    orientation === 'vertical' && !!children && (active || alwaysExpanded);
  const isFirst = index === 0;

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
    },
  });

  const stepperContextValue: IStepContextValue = {
    completed,
    hasContent: expanded,
    hasText,
    orientation,
    labelPosition,
  };

  return (
    <StepContextProvider value={stepperContextValue}>
      <div {...getStyles('buttonContainer')}>
        {/* {orientation === 'vertical' ? renderInnerConnectors() : null} */}
        <Button
          {...getStyles('root')}
          loading={loading}
          disabled={disabled}
          variant={false}
          ref={forwardedRef}
          start={
            <StepIndicator
              label="1"
              hasError={hasError}
              completed={completed}
              active={active}
              loading={loading}
              disabled={disabled}
            />
          }
          {...other}
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
    </StepContextProvider>
  );
});

Step.theme = stepTheme;
Step.displayName = `@sixui/${COMPONENT_NAME}`;
