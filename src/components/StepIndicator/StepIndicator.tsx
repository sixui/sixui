import type { IStepIndicatorThemeFactory } from './StepIndicator.css';
import type { IStepIndicatorFactory } from './StepIndicator.types';
import { iconExclamationTriangle } from '~/assets/icons';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Checkmark } from '../Checkmark';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { Paper } from '../Paper';
import { SvgIcon } from '../SvgIcon';
import { stepIndicatorTheme } from './StepIndicator.css';

const COMPONENT_NAME = 'StepIndicator';

export const StepIndicator = componentFactory<IStepIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      label,
      icon,
      loading,
      hasError,
      hasErrorIcon,
      completed,
      completedIcon,
      inactive,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const isIconOnly = hasError || loading || !!icon;

    const { getStyles } = useComponentTheme<IStepIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: stepIndicatorTheme,
      modifiers: {
        'has-error': hasError,
        completed,
        inactive,
        disabled,
        'icon-only': isIconOnly,
      },
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        {loading ? (
          <IndeterminateCircularProgressIndicator />
        ) : (
          (icon ??
          (hasError
            ? (hasErrorIcon ?? <SvgIcon icon={iconExclamationTriangle} />)
            : completed
              ? (completedIcon ?? <Checkmark {...getStyles('label')} checked />)
              : label && <div {...getStyles('label')}>{label}</div>))
        )}
      </Paper>
    );
  },
);

StepIndicator.theme = stepIndicatorTheme;
StepIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
