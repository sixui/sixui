import type { IStepperStepIndicatorThemeFactory } from './StepperStepIndicator.css';
import type { IStepperStepIndicatorFactory } from './StepperStepIndicator.types';
import { iconExclamationTriangle } from '~/assets/icons';
import { Checkmark } from '~/components/Checkmark';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Paper } from '~/components/Paper';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './StepperStepIndicator.constants';
import { stepperStepIndicatorTheme } from './StepperStepIndicator.css';

export const StepperStepIndicator =
  componentFactory<IStepperStepIndicatorFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      label,
      icon,
      loading,
      hasError,
      hasErrorIcon,
      completed,
      completedIcon,
      active,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const isIconOnly = hasError || loading || !!icon;

    const { getStyles } = useComponentTheme<IStepperStepIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: stepperStepIndicatorTheme,
      modifiers: {
        'has-error': hasError,
        completed,
        active,
        disabled,
        'icon-only': isIconOnly,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        {loading || icon || hasError ? (
          <div {...getStyles('icon')}>
            {loading ? (
              <IndeterminateCircularProgressIndicator />
            ) : hasError ? (
              (hasErrorIcon ?? <SvgIcon icon={iconExclamationTriangle} />)
            ) : (
              icon
            )}
          </div>
        ) : completed ? (
          (completedIcon ?? <Checkmark {...getStyles('label')} checked />)
        ) : (
          label && <div {...getStyles('label')}>{label}</div>
        )}
        {children}
      </Paper>
    );
  });

StepperStepIndicator.theme = stepperStepIndicatorTheme;
StepperStepIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
