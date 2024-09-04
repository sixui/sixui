import type { IIndicatorFactory } from './Indicator.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '../Box';
import { indicatorStyles, type IIndicatorStylesFactory } from './Indicator.css';

const COMPONENT_NAME = 'Indicator';

export const Indicator = componentFactory<IIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      variant,
      processing,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useStyles<IIndicatorStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: indicatorStyles,
      style,
      variant,
      modifiers: {
        processing,
      },
    });

    return (
      <Box {...other} {...getStyles('root')} ref={forwardedRef}>
        {children}
      </Box>
    );
  },
);
