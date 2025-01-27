import type { ICheckmarkThemeFactory } from './Checkmark.css';
import type { ICheckmarkFactory } from './Checkmark.types';
import { Box } from '~/components/Box';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { checkmarkTheme } from './Checkmark.css';

const COMPONENT_NAME = 'Checkmark';

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
      modifiers: {
        disabled,
        on,
        checked,
        indeterminate,
        'was-unchecked': wasUnchecked,
        'was-disabled': wasDisabled,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
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

Checkmark.theme = checkmarkTheme;
Checkmark.displayName = `@sixui/${COMPONENT_NAME}`;
