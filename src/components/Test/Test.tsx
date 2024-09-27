import type { ITestThemeFactory } from './Test.css';
import type { ITestFactory } from './Test.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { testTheme } from './Test.css';

const COMPONENT_NAME = 'Test';

// FIXME: delete
export const Test = componentFactory<ITestFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant,
    items,
    itemRenderer,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const { getStyles } = useComponentTheme<ITestThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    theme: testTheme,
    variant,
  });

  return (
    <Box {...getStyles('root')} as="ul" ref={forwardedRef} {...other}>
      {items.map((item, index) => (
        <li key={index}>{itemRenderer(item)}</li>
      ))}
    </Box>
  );
});

Test.theme = testTheme;
Test.displayName = `@sixui/${COMPONENT_NAME}`;
