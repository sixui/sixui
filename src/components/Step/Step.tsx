import type { IStepContextValue } from './Step.context';
import type { IStepThemeFactory } from './Step.css';
import type { IStepFactory } from './Step.types';
import { iconCheckmark, iconExclamationTriangle } from '~/assets/icons';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Button } from '../Button';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { StepIndicator } from '../StepIndicator';
import { useStepperContext } from '../Stepper';
import { SvgIcon } from '../SvgIcon';
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
    !disabled && (activeProp ?? index === stepperContext?.activeStep);
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
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <div {...getStyles('buttonContainer')}>
          {/* {orientation === 'vertical' ? renderInnerConnectors() : null} */}
          <Button
            {...getStyles('button')}
            // onClick={onClick}
            // disabled={disabled}
          >
            <div {...getStyles('buttonInner')} horizontal gap={2}>
              {loading || icon || hasError ? (
                <div {...getStyles('bulletPoint')}>
                  <div {...getStyles('icon', state && `icon$${state}`)}>
                    {loading ? (
                      <IndeterminateCircularProgressIndicator />
                    ) : (
                      (icon ??
                      (hasError && <SvgIcon icon={iconExclamationTriangle} />))
                    )}
                  </div>
                </div>
              ) : (
                <div {...getStyles('bulletPoint', 'bulletPoint$container')}>
                  <div
                    {...getStyles('background', state && `background$${state}`)}
                  />
                  <div {...getStyles('text', state && `text$${state}`)}>
                    {completed ? <SvgIcon icon={iconCheckmark} /> : index + 1}
                  </div>
                </div>
              )}

              {hasText && (
                <div {...getStyles('labelContainer')}>
                  {label && <div {...getStyles('label')}>{label}</div>}
                  {supportingText && (
                    <div {...getStyles('supportingText')}>{supportingText}</div>
                  )}
                </div>
              )}
            </div>
          </Button>
        </div>
      </Box>
    </StepContextProvider>
  );
});

Step.theme = stepTheme;
Step.displayName = `@sixui/${COMPONENT_NAME}`;
Step.Indicator = StepIndicator;
