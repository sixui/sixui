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
    nonInteractive,
    disabled,
    loading,
    index = 0,
    last,
    icon,
    label,
    supportingText,
    hasError,
    orientation,
    nextConnector,
    alwaysExpanded,
    labelPosition,
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
  const active =
    !disabled &&
    (activeProp ?? (stepperContext && index === stepperContext.activeStep));
  const expanded =
    orientation === 'vertical' && !!children && (active || alwaysExpanded);

  const state = disabled
    ? 'disabled'
    : hasError
      ? 'error'
      : completed
        ? 'completed'
        : !active
          ? 'inactive'
          : undefined;

  const { getStyles } = useComponentTheme<IStepThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: stepTheme,
    modifiers: {
      disabled,
      'label-position': labelPosition,
      state,
      'non-interactive': nonInteractive,
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
          {label && <div>{label}</div>}
          {supportingText && (
            <div {...getStyles('supportingText')}>{supportingText}</div>
          )}
        </Button>
      </div>
    </StepContextProvider>
  );
});

Step.theme = stepTheme;
Step.displayName = `@sixui/${COMPONENT_NAME}`;
Step.Indicator = StepIndicator;
