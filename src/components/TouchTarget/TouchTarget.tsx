import type { ITouchTargetFactory } from './TouchTarget.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '~/components/Box';
import {
  touchTargetStyles,
  type ITouchTargetStylesFactory,
} from './TouchTarget.css';

const COMPONENT_NAME = 'TouchTarget';

export const TouchTarget = componentFactory<ITouchTargetFactory>(
  (props, forwardedRef) => {
    const { classNames, className, style, variant, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    const { getStyles } = useStyles<ITouchTargetStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: touchTargetStyles,
      style,
      variant,
    });

    return <Box {...other} {...getStyles('root')} ref={forwardedRef} />;
  },
);

TouchTarget.styles = touchTargetStyles;
TouchTarget.displayName = `@sixui/${COMPONENT_NAME}`;
