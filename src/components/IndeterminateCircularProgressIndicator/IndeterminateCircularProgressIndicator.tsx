import type { IIndeterminateCircularProgressIndicatorThemeFactory } from './IndeterminateCircularProgressIndicator.css';
import type { IIndeterminateCircularProgressIndicatorFactory } from './IndeterminateCircularProgressIndicator.types';
import { Box } from '~/components/Box';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { indeterminateCircularProgressIndicatorTheme } from './IndeterminateCircularProgressIndicator.css';

const COMPONENT_NAME = 'IndeterminateCircularProgressIndicator';

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

          {children && <div {...getStyles('layer')}>{children}</div>}
        </Box>
      );
    },
  );

IndeterminateCircularProgressIndicator.theme =
  indeterminateCircularProgressIndicatorTheme;
IndeterminateCircularProgressIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
