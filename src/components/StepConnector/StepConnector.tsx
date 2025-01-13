import type { IStepConnectorThemeFactory } from './StepConnector.css';
import type { IStepConnectorFactory } from './StepConnector.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Divider } from '../Divider';
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
      stepLabelPosition,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IStepConnectorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dividerTheme,
    });

    return <Divider {...getStyles('root')} ref={forwardedRef} {...other} />;
  },
);

StepConnector.theme = dividerTheme;
StepConnector.displayName = `@sixui/${COMPONENT_NAME}`;
