import type { IDisclosureThemeFactory } from './Disclosure.css';
import type { IDisclosureFactory } from './Disclosure.types';
import { Box } from '~/components/Box';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { Expandable } from '~/components/Expandable';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Disclosure.constants';
import { DisclosureTrigger } from './DisclosureTrigger';
import { disclosureTheme } from './Disclosure.css';

export const Disclosure = componentFactory<IDisclosureFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      trigger,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });
    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const { getStyles } = useComponentTheme<IDisclosureThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: disclosureTheme,
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...boxProps}>
        <Expandable trigger={trigger} ref={forwardedRef} {...forwardedProps}>
          <div {...getStyles('panel')}>{children}</div>
        </Expandable>
      </Box>
    );
  },
);

Disclosure.theme = disclosureTheme;
Disclosure.displayName = `@sixui/core/${COMPONENT_NAME}`;
Disclosure.Trigger = DisclosureTrigger;
