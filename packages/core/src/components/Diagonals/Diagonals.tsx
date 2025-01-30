import type { IDiagonalsThemeFactory } from './Diagonals.css';
import type { IDiagonalsFactory } from './Diagonals.types';
import { Box } from '~/components/Box';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { COMPONENT_NAME } from './Diagonals.constants';
import { diagonalsTheme } from './Diagonals.css';

export const Diagonals = componentFactory<IDiagonalsFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDiagonalsThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: diagonalsTheme,
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
          {...getStyles('svg')}
        >
          <line {...getStyles('line')} x1="0" y1="0" x2="100" y2="100" />
          <line {...getStyles('line')} x1="100" y1="0" x2="0" y2="100" />
        </svg>
        {children}
      </Box>
    );
  },
);

Diagonals.theme = diagonalsTheme;
Diagonals.displayName = `@sixui/${COMPONENT_NAME}`;
