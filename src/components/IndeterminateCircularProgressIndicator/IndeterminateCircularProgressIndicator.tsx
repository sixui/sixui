import type { IIndeterminateCircularProgressIndicatorFactory } from './IndeterminateCircularProgressIndicator.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useStyles } from '~/utils/styles/useStyles';
import { useProps } from '~/utils/component/useProps';
import { Box } from '../Box';
import {
  indeterminateCircularProgressIndicatorStyles,
  type IIndeterminateCircularProgressIndicatorStylesFactory,
} from './IndeterminateCircularProgressIndicator.css';

const COMPONENT_NAME = 'IndeterminateCircularProgressIndicator';

export const IndeterminateCircularProgressIndicator =
  componentFactory<IIndeterminateCircularProgressIndicatorFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        style,
        variant,
        disabled,
        children,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } =
        useStyles<IIndeterminateCircularProgressIndicatorStylesFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles: indeterminateCircularProgressIndicatorStyles,
          style,
          variant,
          modifiers: { disabled },
        });

      return (
        <Box
          {...other}
          {...getStyles('root')}
          ref={forwardedRef}
          role='progressbar'
        >
          <div {...getStyles(['layer', 'progress'])}>
            <div {...getStyles(['layer', 'spinner'])}>
              <div {...getStyles(['layer', 'left'])}>
                <div {...getStyles(['layer', 'circle', 'circle$left'])} />
              </div>
              <div {...getStyles(['layer', 'right'])}>
                <div {...getStyles(['layer', 'circle', 'circle$right'])} />
              </div>
            </div>
          </div>
          {children ? <div {...getStyles('layer')}>{children}</div> : null}
        </Box>
      );
    },
  );

IndeterminateCircularProgressIndicator.styles =
  indeterminateCircularProgressIndicatorStyles;
IndeterminateCircularProgressIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
