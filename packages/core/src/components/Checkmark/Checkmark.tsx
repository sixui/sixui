import type { ICheckmarkThemeFactory } from './Checkmark.css';
import type { ICheckmarkFactory } from './Checkmark.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Checkmark.constants';
import { checkmarkTheme } from './Checkmark.css';

/**
 * @see https://m3.material.io/components/checkbox/overview
 */
export const Checkmark = componentFactory<ICheckmarkFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      disabled,
      checked: checkedProp,
      indeterminate,
      wasUnchecked,
      wasDisabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const checked = checkedProp && !indeterminate;
    const on = checked || indeterminate;

    const { getStyles } = useComponentTheme<ICheckmarkThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: checkmarkTheme,
    });

    return (
      <Box
        {...getStyles('root', {
          modifiers: {
            disabled,
            on,
            checked,
            indeterminate,
            'was-unchecked': wasUnchecked,
            'was-disabled': wasDisabled,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        <svg
          {...getStyles('svg')}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          aria-hidden
        >
          <rect {...getStyles(['mark', 'mark$short'])} />
          <rect {...getStyles(['mark', 'mark$long'])} />
        </svg>
      </Box>
    );
  },
);

Checkmark.displayName = `@sixui/core/${COMPONENT_NAME}`;
Checkmark.theme = checkmarkTheme;
