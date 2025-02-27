import type { IIndeterminateLinearProgressIndicatorThemeFactory } from './IndeterminateLinearProgressIndicator.css';
import type { IIndeterminateLinearProgressIndicatorFactory } from './IndeterminateLinearProgressIndicator.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './IndeterminateLinearProgressIndicator.constants';
import { indeterminateLinearProgressIndicatorTheme } from './IndeterminateLinearProgressIndicator.css';

export const IndeterminateLinearProgressIndicator =
  componentFactory<IIndeterminateLinearProgressIndicatorFactory>(
    (props, forwardedRef) => {
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

      const { getStyles } =
        useComponentTheme<IIndeterminateLinearProgressIndicatorThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: indeterminateLinearProgressIndicatorTheme,
          modifiers: {
            disabled,
          },
        });

      return (
        <Box {...getStyles('root')} ref={forwardedRef} {...other}>
          <div {...getStyles('inactiveTrack')} />
          <div {...getStyles(['bar', 'primaryBar'])}>
            <div {...getStyles(['barInner', 'primaryBarInner'])} />
          </div>
          <div {...getStyles(['bar', 'secondaryBar'])}>
            <div {...getStyles(['barInner', 'secondaryBarInner'])} />
          </div>
          {children}
        </Box>
      );
    },
  );

IndeterminateLinearProgressIndicator.theme =
  indeterminateLinearProgressIndicatorTheme;
IndeterminateLinearProgressIndicator.displayName = `@sixui/core/${COMPONENT_NAME}`;
