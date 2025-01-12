import type { IStepThemeFactory } from './Step.css';
import type { IStepFactory } from './Step.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { stepTheme } from './Step.css';

const COMPONENT_NAME = 'Step';

export const Step = componentFactory<IStepFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant,
    children,
    disabled,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

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
    },
  });

  return (
    <Box {...getStyles('root')} ref={forwardedRef} {...other}>
      {children}
    </Box>
  );
});

Step.theme = stepTheme;
Step.displayName = `@sixui/${COMPONENT_NAME}`;
