import type { IDisclosureThemeFactory } from './Disclosure.css';
import type { IDisclosureFactory } from './Disclosure.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { disclosureTheme, disclosureThemeVariants } from './Disclosure.css';

const COMPONENT_NAME = 'Disclosure';

export const Disclosure = componentFactory<IDisclosureFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'primary',
      children,
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDisclosureThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: disclosureTheme,
      themeVariants: disclosureThemeVariants,
      modifiers: {
        disabled,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

Disclosure.theme = disclosureTheme;
Disclosure.displayName = `@sixui/${COMPONENT_NAME}`;
