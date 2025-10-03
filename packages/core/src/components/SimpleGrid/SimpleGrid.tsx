import { useCallback } from 'react';

import type { ISimpleGridThemeFactory } from './SimpleGrid.css';
import type { ISimpleGridFactory, ISimpleGridProps } from './SimpleGrid.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useClassName } from '~/hooks/useClassName';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SimpleGrid.constants';
import { SimpleGridInlineStyles } from './SimpleGridInlineStyles';
import { simpleGridTheme } from './SimpleGrid.css';

const defaultProps: Partial<ISimpleGridProps> = {
  cols: 1,
  spacing: '$md',
};

export const SimpleGrid = componentFactory<ISimpleGridFactory>(
  (rawProps, forwardedRef) => {
    const props = useProps({
      componentName: COMPONENT_NAME,
      props: rawProps,
      defaultProps,
    });
    const {
      classNames,
      className,
      children,
      styles,
      style,
      variant,
      cols,
      spacing,
      verticalSpacing,
      type = 'media',
      ...other
    } = props;

    const { getStyles } = useComponentTheme<ISimpleGridThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: simpleGridTheme,
    });

    const randomClassName = useClassName();

    const renderRoot = useCallback(
      () => (
        <Box
          {...getStyles('root', {
            className: randomClassName,
          })}
          ref={forwardedRef}
          {...other}
        >
          {children}
        </Box>
      ),
      [children, getStyles, randomClassName, forwardedRef, other],
    );

    return (
      <>
        <SimpleGridInlineStyles
          selector={`.${randomClassName}`}
          cols={cols}
          spacing={spacing}
          verticalSpacing={verticalSpacing}
          queriesType={type}
        />
        {type === 'media' ? (
          renderRoot()
        ) : (
          <div {...getStyles('container')}>{renderRoot()}</div>
        )}
      </>
    );
  },
);

SimpleGrid.displayName = `@sixui/core/${COMPONENT_NAME}`;
SimpleGrid.theme = simpleGridTheme;
