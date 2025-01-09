import type { IDisclosureThemeFactory } from './Disclosure.css';
import type { IDisclosureFactory } from './Disclosure.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { extractBoxProps } from '../Box/extractBoxProps';
import { DisclosureListItem } from '../DisclosureListItem';
import { Expandable } from '../Expandable';
import { disclosureTheme } from './Disclosure.css';

const COMPONENT_NAME = 'Disclosure';

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
Disclosure.displayName = `@sixui/${COMPONENT_NAME}`;
Disclosure.ListItem = DisclosureListItem;
