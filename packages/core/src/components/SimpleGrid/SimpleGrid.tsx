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
    const { classNames, className, styles, style, variant, ...other } = props;

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

    return (
      <>
        <SimpleGridInlineStyles selector={`.${randomClassName}`} {...props} />
        <Box
          {...getStyles('root', {
            className: randomClassName,
          })}
          ref={forwardedRef}
          {...other}
        />
      </>
    );
  },
);

SimpleGrid.theme = simpleGridTheme;
SimpleGrid.displayName = `@sixui/core/${COMPONENT_NAME}`;
