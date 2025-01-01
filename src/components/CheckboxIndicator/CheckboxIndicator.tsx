import type { ICheckboxIndicatorThemeFactory } from './CheckboxIndicator.css';
import type { ICheckboxIndicatorFactory } from './CheckboxIndicator.types';
import { usePrevious } from '~/hooks/usePrevious';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { PaperBase } from '../PaperBase';
import { checkboxIndicatorTheme } from './CheckboxIndicator.css';

const COMPONENT_NAME = 'CheckboxIndicator';

export const CheckboxIndicator = componentFactory<ICheckboxIndicatorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      checked: checkedProp,
      indeterminate,
      loading,
      disabled: disabledProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const checked = checkedProp && !indeterminate;
    const unchecked = !checkedProp && !indeterminate;
    const on = checkedProp || indeterminate;
    const disabled = disabledProp || loading;

    const wasUnchecked = usePrevious(unchecked) ?? false;

    const { getStyles } = useComponentTheme<ICheckboxIndicatorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: checkboxIndicatorTheme,
      modifiers: {
        on,
        checked,
        indeterminate,
        'was-unchecked': wasUnchecked,
        loading,
        disabled,
      },
    });

    return (
      <PaperBase
        {...getStyles('root')}
        classNames={classNames}
        ref={forwardedRef}
        disabled={disabled}
        {...other}
      >
        {loading ? (
          <IndeterminateCircularProgressIndicator
            {...getStyles('progressIndicator')}
            disabled={disabled}
          />
        ) : (
          <>
            <div {...getStyles(['overlay', 'background'])} />
            <svg
              {...getStyles(['overlay', 'icon'])}
              viewBox="0 0 18 18"
              aria-hidden
            >
              <rect {...getStyles(['mark', 'mark$short'])} />
              <rect {...getStyles(['mark', 'mark$long'])} />
            </svg>
          </>
        )}
      </PaperBase>
    );
  },
);

CheckboxIndicator.theme = checkboxIndicatorTheme;
CheckboxIndicator.displayName = `@sixui/${COMPONENT_NAME}`;
