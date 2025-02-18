import type { IIndeterminateCircularProgressIndicatorThemeFactory } from './IndeterminateCircularProgressIndicator.css';
import type { IIndeterminateCircularProgressIndicatorFactory } from './IndeterminateCircularProgressIndicator.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './IndeterminateCircularProgressIndicator.constants';
import { indeterminateCircularProgressIndicatorTheme } from './IndeterminateCircularProgressIndicator.css';

/**
 * @see https://m3.material.io/components/progress-indicators/overview
 */
export const IndeterminateCircularProgressIndicator =
  componentFactory<IIndeterminateCircularProgressIndicatorFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        disabled,
        children,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } =
        useComponentTheme<IIndeterminateCircularProgressIndicatorThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          theme: indeterminateCircularProgressIndicatorTheme,
          variant,
          modifiers: { disabled },
        });

      return (
        <Box
          {...getStyles('root')}
          ref={forwardedRef}
          role="progressbar"
          {...other}
        >
          <div {...getStyles('progress')}>
            <div {...getStyles('spinner')}>
              <div {...getStyles('left')}>
                <div {...getStyles(['circle', 'circle$left'])} />
              </div>
              <div {...getStyles('right')}>
                <div {...getStyles(['circle', 'circle$right'])} />
              </div>
            </div>
          </div>

          {children}
        </Box>
      );
    },
  );

IndeterminateCircularProgressIndicator.theme =
  indeterminateCircularProgressIndicatorTheme;
IndeterminateCircularProgressIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
