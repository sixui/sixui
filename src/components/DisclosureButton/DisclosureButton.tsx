import type { IDisclosureButtonThemeFactory } from './DisclosureButton.css';
import type { IDisclosureButtonFactory } from './DisclosureButton.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ListItem } from '../ListItem';
import { disclosureButtonTheme } from './DisclosureButton.css';

const COMPONENT_NAME = 'DisclosureButton';

export const DisclosureButton = componentFactory<IDisclosureButtonFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      checked,
      defaultChecked,
      indeterminate,
      defaultIndeterminate,
      value,
      onChange,
      loading,
      disabled,
      readOnly,
      required,
      id,
      collapseIcon,
      expandIcon,
      expanded,
      checkable,
      switchable,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDisclosureButtonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: disclosureButtonTheme,
      modifiers: {
        disabled,
      },
    });

    return (
      <ListItem {...getStyles('root')} ref={forwardedRef} {...other}>
        {/* {children} */}
      </ListItem>
    );
  },
);

DisclosureButton.theme = disclosureButtonTheme;
DisclosureButton.displayName = `@sixui/${COMPONENT_NAME}`;
