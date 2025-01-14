import type { IStepConnectorThemeFactory } from './StepConnector.css';
import type { IStepConnectorFactory } from './StepConnector.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Divider } from '../Divider';
import { useStepContext } from '../Step/Step.context';
import { dividerTheme } from './StepConnector.css';

const COMPONENT_NAME = 'StepConnector';

export const StepConnector = componentFactory<IStepConnectorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      orientation: orientationProp,
      labelPosition: labelPositionProp,
      contentPosition: contentPositionProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const stepContext = useStepContext();

    const orientation =
      orientationProp ?? stepContext?.orientation ?? 'horizontal';
    const labelPosition =
      labelPositionProp ?? stepContext?.labelPosition ?? 'right';
    const contentPosition =
      (orientation === 'horizontal' ? contentPositionProp : undefined) ??
      'middle';

    const { getStyles } = useComponentTheme<IStepConnectorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dividerTheme,
      modifiers: {
        orientation,
        'label-position': labelPosition,
        completed: stepContext?.completed,
      },
    });

    return (
      <Divider
        {...getStyles('root')}
        ref={forwardedRef}
        orientation={orientation}
        contentPosition={contentPosition}
        {...other}
      />
    );
  },
);

StepConnector.theme = dividerTheme;
StepConnector.displayName = `@sixui/${COMPONENT_NAME}`;
